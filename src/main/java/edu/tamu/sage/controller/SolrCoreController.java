package edu.tamu.sage.controller;

import static edu.tamu.weaver.response.ApiStatus.SUCCESS;
import static edu.tamu.weaver.validation.model.BusinessValidationType.CREATE;
import static edu.tamu.weaver.validation.model.BusinessValidationType.UPDATE;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import edu.tamu.sage.model.SolrCore;
import edu.tamu.sage.model.User;
import edu.tamu.sage.model.repo.SolrCoreRepo;
import edu.tamu.weaver.auth.annotation.WeaverUser;
import edu.tamu.weaver.response.ApiResponse;
import edu.tamu.weaver.validation.aspect.annotation.WeaverValidatedModel;
import edu.tamu.weaver.validation.aspect.annotation.WeaverValidation;

@RestController
@RequestMapping("/core/solr")
public class SolrCoreController {
    
    @Autowired
    private SolrCoreRepo solrCoreRepo;
    
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    @PreAuthorize("hasRole('ANONYMOUS')")
    public ApiResponse getAll(@WeaverUser User user) {
        return new ApiResponse(SUCCESS, solrCoreRepo.findAll());
    }
    
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @PreAuthorize("hasRole('ANONYMOUS')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = CREATE) })
    public ApiResponse createSolrCore(@RequestBody @WeaverValidatedModel SolrCore solrCore) {
        System.out.println(solrCore.getName());
        logger.info("Creating SolrCore: " + solrCore.getName());
        return new ApiResponse(SUCCESS, solrCoreRepo.create(solrCore));
    }
    
    // Why do we use POST for update and not put?
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @PreAuthorize("hasRole('ANONYMOUS')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = UPDATE) })
    public ApiResponse updateSolrCore(@RequestBody @WeaverValidatedModel SolrCore solrCore) {
        logger.info("Updating SolrCore: " + solrCore.getName());
        return new ApiResponse(SUCCESS, solrCoreRepo.update(solrCore));
    }

}
