package edu.tamu.sage.controller;

import static edu.tamu.weaver.response.ApiStatus.SUCCESS;
import static edu.tamu.weaver.validation.model.BusinessValidationType.CREATE;
import static edu.tamu.weaver.validation.model.BusinessValidationType.DELETE;
import static edu.tamu.weaver.validation.model.BusinessValidationType.UPDATE;

import java.io.IOException;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
    @PreAuthorize("hasRole('USER')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = CREATE) })
    public ApiResponse createDiscoveryView(@WeaverValidatedModel DiscoveryView discoveryView) {
        logger.info("Creating Discovery View: " + discoveryView.getName());
        return new ApiResponse(SUCCESS, discoveryViewRepo.create(discoveryView));
    }

    @RequestMapping(method = RequestMethod.PUT)
    @PreAuthorize("hasRole('USER')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = UPDATE) })
    public ApiResponse updateDiscoveryView(@WeaverValidatedModel DiscoveryView discoveryView) {
        logger.info("Updating Discovery View: " + discoveryView.getName());
        return new ApiResponse(SUCCESS, discoveryViewRepo.update(discoveryView));
    }

    @RequestMapping(method = RequestMethod.DELETE)
    @PreAuthorize("hasRole('USER')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = DELETE) })
    public ApiResponse deleteDiscoveryView(@RequestBody DiscoveryView discoveryView) {
        logger.info("Deleting Discovery View: " + discoveryView.getName());
        discoveryViewRepo.delete(discoveryView);
        return new ApiResponse(SUCCESS);
    }

    @RequestMapping(value = "/context/{slug}", method = RequestMethod.GET)
    @PreAuthorize("hasRole('ANONYMOUS')")
    public ApiResponse findBySlug(@PathVariable String slug, @RequestParam Map<String, String> filterMap, @RequestParam("rows") int rows, @RequestParam("start") int start, @RequestParam("sort") String sort) throws DiscoveryContextNotFoundException, DiscoveryContextBuildException, JsonProcessingException, IOException {

        filterMap.remove("rows");
        filterMap.remove("start");
        filterMap.remove("sort");

        DiscoveryView discoveryView = discoveryViewRepo.findOneBySlug(slug);
        if (discoveryView == null) {
            throw new DiscoveryContextNotFoundException(String.format("Could not find Discovery Context for %s", slug));
        }
        return new ApiResponse(SUCCESS, solrDiscoveryService.buildDiscoveryContext(discoveryView, filterMap, rows, start, sort));
    }

    @RequestMapping(value = "/context/{slug}/{resultId}", method = RequestMethod.GET)
    @PreAuthorize("hasRole('ANONYMOUS')")
    public ApiResponse findResultBySlugAndId(@PathVariable String slug, @PathVariable String resultId) throws DiscoveryContextNotFoundException, DiscoveryContextBuildException, JsonProcessingException, IOException {

        DiscoveryView discoveryView = discoveryViewRepo.findOneBySlug(slug);
        if (discoveryView == null) {
            throw new DiscoveryContextNotFoundException(String.format("Could not find Discovery Context for %s", slug));
        }
        return new ApiResponse(SUCCESS, solrDiscoveryService.getSinlgeResult(discoveryView, resultId));
    }

}