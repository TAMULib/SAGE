package edu.tamu.sage.controller;

import static edu.tamu.weaver.response.ApiStatus.SUCCESS;
import static edu.tamu.weaver.validation.model.BusinessValidationType.CREATE;
import static edu.tamu.weaver.validation.model.BusinessValidationType.DELETE;
import static edu.tamu.weaver.validation.model.BusinessValidationType.UPDATE;

import java.util.ArrayList;
import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import edu.tamu.sage.model.SolrReader;
import edu.tamu.sage.model.repo.SolrReaderRepo;
import edu.tamu.weaver.response.ApiResponse;
import edu.tamu.weaver.validation.aspect.annotation.WeaverValidatedModel;
import edu.tamu.weaver.validation.aspect.annotation.WeaverValidation;

@RestController
@RequestMapping("/reader/solr")
public class SolrReaderController {

    @Autowired
    private SolrReaderRepo solrReaderRepo;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(method = RequestMethod.GET)
    @PreAuthorize("hasRole('ANONYMOUS')")
    public ApiResponse getAll() {
        return new ApiResponse(SUCCESS, solrReaderRepo.findAll());
    }

    @RequestMapping(method = RequestMethod.POST)
    @PreAuthorize("hasRole('USER')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = CREATE) })
    public ApiResponse createSolrReader(@WeaverValidatedModel SolrReader solrReader) {
        logger.info("Creating SolrReader: " + solrReader.getName());
        return new ApiResponse(SUCCESS, solrReaderRepo.create(solrReader));
    }

    @RequestMapping(method = RequestMethod.PUT)
    @PreAuthorize("hasRole('USER')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = UPDATE) })
    public ApiResponse updateSolrReader(@WeaverValidatedModel SolrReader solrReader) {
        logger.info("Updating SolrReader: " + solrReader.getName());
        return new ApiResponse(SUCCESS, solrReaderRepo.update(solrReader));
    }

    @RequestMapping(method = RequestMethod.DELETE)
    @PreAuthorize("hasRole('USER')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = DELETE) })
    public ApiResponse deleteSolrReader(@WeaverValidatedModel SolrReader solrReader) {
        logger.info("Deleting SolrReader: " + solrReader.getName());
        solrReaderRepo.delete(solrReader);
        return new ApiResponse(SUCCESS);
    }

    @RequestMapping("/metadata-fields")
    @PreAuthorize("hasRole('USER')")
    public ApiResponse getMetadataFields() {
        //TODO We'll eventually want the Fields and schema mappings to be dynamically configurable, but this will work in the very short term
        return new ApiResponse(SUCCESS, new ArrayList<String>(Arrays.asList("title","creator","created","subject","format","language","terms.identifier","isPartOf")));
    }
}
