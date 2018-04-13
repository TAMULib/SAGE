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

import edu.tamu.sage.model.SolrWriter;
import edu.tamu.sage.model.repo.SolrWriterRepo;
import edu.tamu.weaver.response.ApiResponse;
import edu.tamu.weaver.validation.aspect.annotation.WeaverValidatedModel;
import edu.tamu.weaver.validation.aspect.annotation.WeaverValidation;

@RestController
@RequestMapping("/writer/solr")
public class SolrWriterController {

    @Autowired
    private SolrWriterRepo solrWriterRepo;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(method = RequestMethod.GET)
    @PreAuthorize("hasRole('ANONYMOUS')")
    public ApiResponse getAll() {
        return new ApiResponse(SUCCESS, solrWriterRepo.findAll());
    }

    @RequestMapping(method = RequestMethod.POST)
    @PreAuthorize("hasRole('USER')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = CREATE) })
    public ApiResponse createSolrReader(@WeaverValidatedModel SolrWriter solrWriter) {
        logger.info("Creating SolrWriter: " + solrWriter.getName());
        solrWriter.getOutputMapping().forEach(m -> {
            logger.info("mapping"+m.getInputField()+" "+m.getOutputMappings().size());
        });
        return new ApiResponse(SUCCESS, solrWriterRepo.create(solrWriter));
    }

    @RequestMapping(method = RequestMethod.PUT)
    @PreAuthorize("hasRole('USER')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = UPDATE) })
    public ApiResponse updateSolrReader(@WeaverValidatedModel SolrWriter solrWriter) {
        logger.info("Updating SolrWriter: " + solrWriter.getName());
        return new ApiResponse(SUCCESS, solrWriterRepo.update(solrWriter));
    }

    @RequestMapping(method = RequestMethod.DELETE)
    @PreAuthorize("hasRole('USER')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = DELETE) })
    public ApiResponse deleteSolrReader(@WeaverValidatedModel SolrWriter solrWriter) {
        logger.info("Deleting SolrReader: " + solrWriter.getName());
        solrWriterRepo.delete(solrWriter);
        return new ApiResponse(SUCCESS);
    }
}
