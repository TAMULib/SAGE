package edu.tamu.sage.controller;

import static edu.tamu.weaver.response.ApiStatus.ERROR;
import static edu.tamu.weaver.response.ApiStatus.SUCCESS;
import static edu.tamu.weaver.response.ApiStatus.WARNING;
import static edu.tamu.weaver.validation.model.BusinessValidationType.CREATE;
import static edu.tamu.weaver.validation.model.BusinessValidationType.DELETE;
import static edu.tamu.weaver.validation.model.BusinessValidationType.UPDATE;

import java.io.IOException;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.request.LukeRequest;
import org.apache.solr.client.solrj.response.FacetField;
import org.apache.solr.client.solrj.response.FacetField.Count;
import org.apache.solr.client.solrj.response.LukeResponse;
import org.apache.solr.client.solrj.response.LukeResponse.FieldInfo;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.tamu.sage.exceptions.SourceFieldsException;
import edu.tamu.sage.model.Source;
import edu.tamu.sage.model.User;
import edu.tamu.sage.model.repo.SourceRepo;
import edu.tamu.sage.service.SourceService;
import edu.tamu.weaver.auth.annotation.WeaverUser;
import edu.tamu.weaver.response.ApiResponse;
import edu.tamu.weaver.validation.aspect.annotation.WeaverValidatedModel;
import edu.tamu.weaver.validation.aspect.annotation.WeaverValidation;

@RestController
@RequestMapping("/source/solr")
public class SourceController {

    @Autowired
    private SourceRepo sourceRepo;

    // NOTE: there is currently only one implementation of SourceService
    // this will have to be updated to know which service to use if and when multiple implentations exists
    // would be practical for an argument resolver to provide the service based on the request
    @Autowired
    private SourceService sourceService;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @RequestMapping("/test/ping")
    @PreAuthorize("hasRole('ANONYMOUS')")
    public ApiResponse testSolrCorePing(@WeaverValidatedModel Source source) throws IOException {
        HttpSolrClient.Builder builder = new HttpSolrClient.Builder();
        builder.withBaseSolrUrl(source.getUri());
        SolrClient solr = builder.build();

        ApiResponse response = new ApiResponse(SUCCESS);

        try {
            solr.ping();
        } catch (Exception e) {
            logger.info("Failed to ping " + source.getName() + " at URL " + source.getUri() + ", response = " + e.getMessage());
            response = new ApiResponse(WARNING, "Failed to connect to " + source.getName() + " at URL " + source.getUri());
        } finally {
            solr.close();
        }

        return response;
    }

    @RequestMapping("/test/location")
    @PreAuthorize("hasRole('ANONYMOUS')")
    public ApiResponse testSolrCoreLocation(@WeaverValidatedModel Source source) throws IOException {
        logger.info("Testing Source location: " + source.getName());

        HttpSolrClient.Builder builder = new HttpSolrClient.Builder();
        builder.withBaseSolrUrl(source.getUri());

        SolrClient solr = builder.build();

        ApiResponse response = new ApiResponse(SUCCESS);

        try {
            solr.ping();
            LukeRequest lukeRequest = new LukeRequest();
            lukeRequest.setNumTerms(0);

            LukeResponse lukeResponse = lukeRequest.process(solr);

            Map<String, FieldInfo> fieldInfoMap = lukeResponse.getFieldInfo();

            SolrQuery query = new SolrQuery();
            query.set("q", "*");

            for (Entry<String, FieldInfo> entry : fieldInfoMap.entrySet()) {
                String fieldName = entry.getKey();
                // FieldInfo fieldInfo = entry.getValue();
                query.addFilterQuery(fieldName + ":*");
                query.setFacet(true);
                query.addFacetField(fieldName);
            }

            System.out.println(query);
            QueryResponse queryResponse = solr.query(query);

            // List<FacetField> facetFields = queryResponse.getFacetFields();
            FacetField cnameMainFacetField = queryResponse.getFacetField("name");
            for (Count cnameAndCount : cnameMainFacetField.getValues()) {
                String cnameMain = cnameAndCount.getName();
                System.out.println(cnameMain);
                System.out.println(cnameAndCount.getCount());
            }

        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
            response = new ApiResponse(ERROR, "Error connecting with " + source.getName() + " at URL " + source.getUri());
        } finally {
            solr.close();
        }

        return response;
    }

    @RequestMapping("/test/authorization")
    @PreAuthorize("hasRole('ANONYMOUS')")
    public ApiResponse testSolrCoreAuthorization(@WeaverValidatedModel Source source) {
        return new ApiResponse(SUCCESS);
    }

    @RequestMapping(method = RequestMethod.GET)
    @PreAuthorize("hasRole('ANONYMOUS')")
    public ApiResponse getAll(@WeaverUser User user) {
        return new ApiResponse(SUCCESS, sourceRepo.findAll());
    }

    @RequestMapping("/writeable")
    @PreAuthorize("hasRole('USER')")
    public ApiResponse getWriteable(@WeaverUser User user) {
        return new ApiResponse(SUCCESS, sourceRepo.findByReadOnly(false));
    }

    @RequestMapping("/readable")
    @PreAuthorize("hasRole('USER')")
    public ApiResponse getReadable(@WeaverUser User user) {
        return new ApiResponse(SUCCESS, sourceRepo.findByReadOnly(true));
    }

    @RequestMapping(method = RequestMethod.POST)
    @PreAuthorize("hasRole('MANAGER')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = CREATE) })
    public ApiResponse createSolrCore(@WeaverValidatedModel Source source) {
        logger.info("Creating Source: " + source.getName());
        return new ApiResponse(SUCCESS, sourceRepo.create(source));
    }

    @RequestMapping(method = RequestMethod.PUT)
    @PreAuthorize("hasRole('MANAGER')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = UPDATE) })
    public ApiResponse updateSolrCore(@WeaverValidatedModel Source source) {
        logger.info("Updating Source: " + source.getName());
        return new ApiResponse(SUCCESS, sourceRepo.update(source));
    }

    @RequestMapping(method = RequestMethod.DELETE)
    @PreAuthorize("hasRole('MANAGER')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = DELETE) })
    public ApiResponse deleteSolrCore(@WeaverValidatedModel Source source) {
        logger.info("Deleting Source: " + source.getName());
        sourceRepo.delete(source);
        return new ApiResponse(SUCCESS);
    }

    @GetMapping("/fields/indexed")
    @PreAuthorize("hasRole('USER')")
    public ApiResponse getIndexedFields(@RequestParam String uri, @RequestParam String filter) throws SourceFieldsException {
        logger.info(String.format("Getting indexed fields for source %s with filter %s ", uri, filter));
        return new ApiResponse(SUCCESS, sourceService.getIndexedFields(uri, filter));
    }

    @GetMapping("/fields/available")
    @PreAuthorize("hasRole('USER')")
    public ApiResponse getAvailableFields(@RequestParam String uri, @RequestParam String filter) throws SourceFieldsException {
        logger.info(String.format("Getting available fields for source %s with filter %s ", uri, filter));
        return new ApiResponse(SUCCESS, sourceService.getAvailableFields(uri, filter));
    }

    @GetMapping("/application-types")
    @PreAuthorize("hasRole('USER')")
    public ApiResponse getApplicationTypes() {
        logger.info(String.format("Getting application types"));
        return new ApiResponse(SUCCESS, sourceService.getApplicationTypes());
    }

}
