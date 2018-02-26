package edu.tamu.sage.controller;

import static edu.tamu.weaver.response.ApiStatus.SUCCESS;
import static edu.tamu.weaver.validation.model.BusinessValidationType.CREATE;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.tamu.sage.model.SolrCore;
import edu.tamu.sage.model.User;
import edu.tamu.sage.model.repo.IndexRepo;
import edu.tamu.weaver.auth.annotation.WeaverUser;
import edu.tamu.weaver.response.ApiResponse;
import edu.tamu.weaver.validation.aspect.annotation.WeaverValidatedModel;
import edu.tamu.weaver.validation.aspect.annotation.WeaverValidation;

@RestController
@RequestMapping("/index")
public class IndexController {
    
    @Autowired
    private IndexRepo indexRepo;
    
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @RequestMapping("/all")
    @PreAuthorize("hasRole('USER')")
    public ApiResponse getAll(@WeaverUser User user) {
        System.out.println(user.getRole());
        return new ApiResponse(SUCCESS, indexRepo.findAll());
    }
    
    @RequestMapping("/create")
    @PreAuthorize("hasRole('USER')")
//    @WeaverValidation(business = { @WeaverValidation.Business(value = CREATE) })
    public ApiResponse createIndex(@RequestBody @WeaverValidatedModel SolrCore index) {
        System.out.println(index.getName());
        logger.info("Creating Index: " + index.getName());
        return new ApiResponse(SUCCESS, indexRepo.create(index));
    }

}
