package edu.tamu.sage.controller;

import static edu.tamu.weaver.response.ApiStatus.SUCCESS;
import static edu.tamu.weaver.validation.model.BusinessValidationType.CREATE;
import static edu.tamu.weaver.validation.model.BusinessValidationType.DELETE;
import static edu.tamu.weaver.validation.model.BusinessValidationType.UPDATE;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;

import edu.tamu.sage.model.BaseOp;
import edu.tamu.sage.model.Job;
import edu.tamu.sage.model.repo.OperatorRepo;
import edu.tamu.weaver.response.ApiResponse;
import edu.tamu.weaver.validation.aspect.annotation.WeaverValidatedModel;
import edu.tamu.weaver.validation.aspect.annotation.WeaverValidation;

@RestController
@RequestMapping("/operators")
public class OperatorController {

    private final static Logger logger = LoggerFactory.getLogger(OperatorController.class);

    @Autowired
    private OperatorRepo operatorRepo;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse getAll() {
        return new ApiResponse(SUCCESS, operatorRepo.findAll());
    }

    @GetMapping("/types")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse getTypes() {
        JsonSubTypes jsonSubTypes = AnnotationUtils.getAnnotation(BaseOp.class, JsonSubTypes.class);
        List<OperatorType> types = new ArrayList<OperatorType>();
        for (Type type : jsonSubTypes.value()) {
            types.add(new OperatorType(type.name(), type.value().getSimpleName()));
        }
        return new ApiResponse(SUCCESS, types);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = CREATE) })
    public ApiResponse createInternalMetadatum(@WeaverValidatedModel BaseOp operator) {
        logger.info(String.format("Creating operator %s of type %s", operator.getName(), operator.getType()));
        return new ApiResponse(SUCCESS, operatorRepo.create(operator));
    }

    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = UPDATE) })
    public ApiResponse updateInternalMetadatum(@WeaverValidatedModel BaseOp operator) {
        logger.info(String.format("Updating operator %s of type %s", operator.getName(), operator.getType()));
        return new ApiResponse(SUCCESS, operatorRepo.update(operator));
    }

    @DeleteMapping
    @PreAuthorize("hasRole('ADMIN')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = DELETE, joins = Job.class, path = "operators") })
    public ApiResponse deleteInternalMetadatum(@WeaverValidatedModel BaseOp operator) {
        logger.info(String.format("Deleting operator %s of type %s", operator.getName(), operator.getType()));
        operatorRepo.delete(operator);
        return new ApiResponse(SUCCESS);
    }

    class OperatorType {

        private final String name;

        private final String entity;

        public OperatorType(String name, String entity) {
            this.name = name;
            this.entity = entity;
        }

        public String getName() {
            return name;
        }

        public String getEntity() {
            return entity;
        }

    }

}
