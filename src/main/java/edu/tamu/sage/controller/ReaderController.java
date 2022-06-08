package edu.tamu.sage.controller;

import static edu.tamu.weaver.response.ApiStatus.SUCCESS;
import static edu.tamu.weaver.validation.model.BusinessValidationType.CREATE;
import static edu.tamu.weaver.validation.model.BusinessValidationType.DELETE;
import static edu.tamu.weaver.validation.model.BusinessValidationType.UPDATE;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import edu.tamu.sage.model.Reader;
import edu.tamu.sage.model.repo.ReaderRepo;
import edu.tamu.weaver.response.ApiResponse;
import edu.tamu.weaver.validation.aspect.annotation.WeaverValidatedModel;
import edu.tamu.weaver.validation.aspect.annotation.WeaverValidation;

@RestController
@RequestMapping("/reader/solr")
public class ReaderController {

    @Autowired
    private ReaderRepo solrReaderRepo;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(method = RequestMethod.GET)
    @PreAuthorize("hasRole('ANONYMOUS')")
    public ApiResponse getAll() {
        return new ApiResponse(SUCCESS, solrReaderRepo.findAll());
    }

    @RequestMapping(method = RequestMethod.POST)
    @PreAuthorize("hasRole('MANAGER')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = CREATE) })
    public ApiResponse createReader(@WeaverValidatedModel Reader solrReader) {
        logger.info("Creating Reader: " + solrReader.getName());
        return new ApiResponse(SUCCESS, solrReaderRepo.create(solrReader));
    }

    @RequestMapping(method = RequestMethod.PUT)
    @PreAuthorize("hasRole('MANAGER')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = UPDATE) })
    public ApiResponse updateReader(@WeaverValidatedModel Reader solrReader) {
        logger.info("Updating Reader: " + solrReader.getName());
        return new ApiResponse(SUCCESS, solrReaderRepo.update(solrReader));
    }

    @RequestMapping(method = RequestMethod.DELETE)
    @PreAuthorize("hasRole('MANAGER')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = DELETE) })
    public ApiResponse deleteReader(@WeaverValidatedModel Reader solrReader) {
        logger.info("Deleting Reader: " + solrReader.getName());
        solrReaderRepo.deleteById(solrReader.getId());
        return new ApiResponse(SUCCESS);
    }

}
