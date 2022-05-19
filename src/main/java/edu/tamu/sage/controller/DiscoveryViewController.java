package edu.tamu.sage.controller;

import static edu.tamu.weaver.response.ApiStatus.SUCCESS;
import static edu.tamu.weaver.validation.model.BusinessValidationType.CREATE;
import static edu.tamu.weaver.validation.model.BusinessValidationType.DELETE;
import static edu.tamu.weaver.validation.model.BusinessValidationType.UPDATE;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;

import edu.tamu.sage.exceptions.DiscoveryContextBuildException;
import edu.tamu.sage.exceptions.DiscoveryContextNotFoundException;
import edu.tamu.sage.model.DiscoveryView;
import edu.tamu.sage.model.MetadataField;
import edu.tamu.sage.model.repo.DiscoveryViewRepo;
import edu.tamu.sage.service.SolrDiscoveryService;
import edu.tamu.weaver.response.ApiResponse;
import edu.tamu.weaver.validation.aspect.annotation.WeaverValidatedModel;
import edu.tamu.weaver.validation.aspect.annotation.WeaverValidation;

@RestController
@RequestMapping("/discovery-view")
public class DiscoveryViewController {

    @Autowired
    private DiscoveryViewRepo discoveryViewRepo;

    @Autowired
    private SolrDiscoveryService solrDiscoveryService;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(method = RequestMethod.GET)
    @PreAuthorize("hasRole('ANONYMOUS')")
    public ApiResponse getAll() {
        return new ApiResponse(SUCCESS, discoveryViewRepo.findAll());
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @PreAuthorize("hasRole('ANONYMOUS')")
    public ApiResponse getDiscoveryViewById(@PathVariable long id) {
        return new ApiResponse(SUCCESS, discoveryViewRepo.read(id));
    }

    @RequestMapping(method = RequestMethod.POST)
    @PreAuthorize("hasRole('MANAGER')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = CREATE) })
    public ApiResponse createDiscoveryView(@WeaverValidatedModel DiscoveryView discoveryView) {
        logger.info("Creating Discovery View: " + discoveryView.getName());
        return new ApiResponse(SUCCESS, discoveryViewRepo.create(discoveryView));
    }

    @RequestMapping(method = RequestMethod.PUT)
    @PreAuthorize("hasRole('MANAGER')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = UPDATE) })
    public ApiResponse updateDiscoveryView(@WeaverValidatedModel DiscoveryView discoveryView) {
        logger.info("Updating Discovery View: " + discoveryView.getName());
        return new ApiResponse(SUCCESS, discoveryViewRepo.update(discoveryView));
    }

    @RequestMapping(method = RequestMethod.DELETE)
    @PreAuthorize("hasRole('MANAGER')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = DELETE) })
    public ApiResponse deleteDiscoveryView(@RequestBody DiscoveryView discoveryView) {
        logger.info("Deleting Discovery View: " + discoveryView.getName());
        discoveryViewRepo.delete(discoveryView);
        return new ApiResponse(SUCCESS);
    }

    @RequestMapping(value = "/context/{slug}", method = RequestMethod.GET)
    @PreAuthorize("hasRole('ANONYMOUS')")
    public ApiResponse findBySlug(@PathVariable String slug, @RequestParam(name = "field", defaultValue = "") String field, @RequestParam(name = "value", defaultValue = "") String value, @PageableDefault(page = 0, size = 10) Pageable page, @RequestParam(name = "offset", defaultValue = "0") int offset, @RequestParam String direction, @RequestParam Map<String, String> reqFilterMap) throws DiscoveryContextNotFoundException, UnsupportedEncodingException, DiscoveryContextBuildException {
        DiscoveryView discoveryView = discoveryViewRepo.findOneBySlug(slug);
        if (discoveryView == null) {
            throw new DiscoveryContextNotFoundException(String.format("Could not find Discovery Context for %s", slug));
        }

        String titleKey = discoveryView.getTitleKey().replaceAll("[{}]", "");
        Optional<MetadataField> sortableField = discoveryView.getResultMetadataFields().stream().filter(r -> r.getKey().equals(titleKey)).findFirst();
        if (sortableField.isPresent() && sortableField.get().isSortable()) {
            if (page.getSort() == null) {
                Direction defaultDirection = discoveryView.isAscending() ? Direction.ASC : Direction.DESC;
                PageRequest pageRequest = PageRequest.of(page.getPageNumber(), page.getPageSize(),Sort.by(defaultDirection, field));
                page = pageRequest;
            } else {
                String sort = page.getSort().toString().split(":")[0];
                page = PageRequest.of(page.getPageNumber(), page.getPageSize(),Sort.Direction.fromString(direction), sort);
            }
        }

        reqFilterMap.remove("field");
        reqFilterMap.remove("value");
        reqFilterMap.remove("page");
        reqFilterMap.remove("size");
        reqFilterMap.remove("sort");
        reqFilterMap.remove("offset");
        reqFilterMap.remove("direction");

        Map<String, String> filterMap = new HashMap<String,String>();
        reqFilterMap.forEach((k,v) -> {
           filterMap.put( k.replace("f.", ""), v);
        });

        return new ApiResponse(SUCCESS, solrDiscoveryService.buildDiscoveryContext(discoveryView, field, value, page, offset, filterMap));
    }

    @RequestMapping(value = "/context/{slug}/{resultId}", method = RequestMethod.GET)
    @PreAuthorize("hasRole('ANONYMOUS')")
    public ApiResponse findResultBySlugAndId(@PathVariable String slug, @PathVariable String resultId) throws DiscoveryContextNotFoundException, DiscoveryContextBuildException, JsonProcessingException, IOException {

        DiscoveryView discoveryView = discoveryViewRepo.findOneBySlug(slug);
        if (discoveryView == null) {
            throw new DiscoveryContextNotFoundException(String.format("Could not find Discovery Context for %s", slug));
        }
        return new ApiResponse(SUCCESS, solrDiscoveryService.getSingleResult(discoveryView, resultId));
    }

    @RequestMapping(value = "/context/full/{slug}/{resultId}", method = RequestMethod.GET)
    @PreAuthorize("hasRole('MANAGER')")
    public ApiResponse findFullResultBySlugAndId(@PathVariable String slug, @PathVariable String resultId) throws DiscoveryContextNotFoundException, DiscoveryContextBuildException, JsonProcessingException, IOException {

        DiscoveryView discoveryView = discoveryViewRepo.findOneBySlug(slug);
        if (discoveryView == null) {
            throw new DiscoveryContextNotFoundException(String.format("Could not find Discovery Context for %s", slug));
        }
        return new ApiResponse(SUCCESS, solrDiscoveryService.getSingleResultFull(discoveryView, resultId));
    }
}
