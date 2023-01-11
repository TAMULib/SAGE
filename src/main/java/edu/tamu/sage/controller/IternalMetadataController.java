package edu.tamu.sage.controller;

import static edu.tamu.weaver.response.ApiStatus.SUCCESS;
import static edu.tamu.weaver.validation.model.BusinessValidationType.CREATE;
import static edu.tamu.weaver.validation.model.BusinessValidationType.DELETE;
import static edu.tamu.weaver.validation.model.BusinessValidationType.UPDATE;

import edu.tamu.sage.model.InternalMetadata;
import edu.tamu.sage.model.repo.InternalMetadataRepo;
import edu.tamu.weaver.response.ApiResponse;
import edu.tamu.weaver.validation.aspect.annotation.WeaverValidatedModel;
import edu.tamu.weaver.validation.aspect.annotation.WeaverValidation;
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

@RestController
@RequestMapping("/internal/metadata")
public class IternalMetadataController {

    private final static Logger logger = LoggerFactory.getLogger(IternalMetadataController.class);

    @Autowired
    private InternalMetadataRepo internalMetadataRepo;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse getAll() {
        return new ApiResponse(SUCCESS, internalMetadataRepo.findAllByOrderByFieldAsc());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = CREATE) })
    public ApiResponse createInternalMetadatum(@WeaverValidatedModel InternalMetadata internalMetadatum) {
        logger.info(String.format("Creating internal metadatum %s with field %s", internalMetadatum.getGloss(), internalMetadatum.getField()));
        return new ApiResponse(SUCCESS, internalMetadataRepo.create(internalMetadatum));
    }

    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = UPDATE) })
    public ApiResponse updateInternalMetadatum(@WeaverValidatedModel InternalMetadata internalMetadatum) {
        logger.info(String.format("Updating internal metadatum %s with field %s", internalMetadatum.getGloss(), internalMetadatum.getField()));
        return new ApiResponse(SUCCESS, internalMetadataRepo.update(internalMetadatum));
    }

    @DeleteMapping
    @PreAuthorize("hasRole('ADMIN')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = DELETE) })
    public ApiResponse deleteInternalMetadatum(@WeaverValidatedModel InternalMetadata internalMetadatum) {
        logger.info(String.format("Deleting internal metadatum %s with field %s", internalMetadatum.getGloss(), internalMetadatum.getField()));
        internalMetadataRepo.delete(internalMetadatum);
        return new ApiResponse(SUCCESS);
    }

}
