package edu.tamu.sage.controller;

import static edu.tamu.weaver.response.ApiStatus.SUCCESS;
import static edu.tamu.weaver.validation.model.BusinessValidationType.CREATE;
import static edu.tamu.weaver.validation.model.BusinessValidationType.DELETE;
import static edu.tamu.weaver.validation.model.BusinessValidationType.UPDATE;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.tamu.sage.model.BaseOp;
import edu.tamu.sage.model.repo.OperatorRepo;
import edu.tamu.weaver.response.ApiResponse;
import edu.tamu.weaver.validation.aspect.annotation.WeaverValidatedModel;
import edu.tamu.weaver.validation.aspect.annotation.WeaverValidation;

@RestController
@RequestMapping("/operator")
public class OperatorController {

    private final static Logger logger = LoggerFactory.getLogger(OperatorController.class);

    @Autowired
    private OperatorRepo operatorRepo;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse getAll() {
        return new ApiResponse(SUCCESS, operatorRepo.findAll());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = CREATE) })
    public ApiResponse createInternalMetadatum(@WeaverValidatedModel BaseOp operator) {
        logger.info(String.format("Creating operator %s with id %s", operator.getName(), operator.getId()));
        return new ApiResponse(SUCCESS, operatorRepo.create(operator));
    }

    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = UPDATE) })
    public ApiResponse updateInternalMetadatum(@WeaverValidatedModel BaseOp operator) {
        logger.info(String.format("Updating operator %s with id %s", operator.getName(), operator.getId()));
        return new ApiResponse(SUCCESS, operatorRepo.update(operator));
    }

    @DeleteMapping
    @PreAuthorize("hasRole('ADMIN')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = DELETE) })
    public ApiResponse deleteInternalMetadatum(@WeaverValidatedModel BaseOp operator) {
        logger.info(String.format("Deleting operator %s with id %s", operator.getName(), operator.getId()));
        operatorRepo.delete(operator);
        return new ApiResponse(SUCCESS);
    }

}
