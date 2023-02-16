package edu.tamu.sage.controller;

import static edu.tamu.weaver.response.ApiStatus.ERROR;
import static edu.tamu.weaver.response.ApiStatus.INFO;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.tamu.sage.model.Job;
import edu.tamu.sage.model.repo.JobRepo;
import edu.tamu.sage.service.SimpleProcessorService;
import edu.tamu.weaver.response.ApiResponse;
import edu.tamu.weaver.validation.aspect.annotation.WeaverValidatedModel;
import edu.tamu.weaver.validation.aspect.annotation.WeaverValidation;

@RestController
@RequestMapping("/job/solr")
public class JobController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private JobRepo jobRepo;

    @Autowired
    private SimpleProcessorService processorService;

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public ApiResponse getAll() {
        return new ApiResponse(SUCCESS, jobRepo.findAllByOrderByNameAsc());
    }

    @PostMapping
    @PreAuthorize("hasRole('MANAGER')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = CREATE) })
    public ApiResponse createReader(@WeaverValidatedModel Job job) {
        logger.info(String.format("Creating job %s", job.getName()));
        return new ApiResponse(SUCCESS, jobRepo.create(job));
    }

    @PutMapping
    @PreAuthorize("hasRole('MANAGER')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = UPDATE) })
    public ApiResponse updateReader(@WeaverValidatedModel Job job) {
        logger.info(String.format("Updating job %s", job.getName()));
        return new ApiResponse(SUCCESS, jobRepo.update(job));
    }

    @DeleteMapping
    @PreAuthorize("hasRole('MANAGER')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = DELETE) })
    public ApiResponse deleteReader(@WeaverValidatedModel Job job) {
        logger.info(String.format("Deleting job %s", job.getName()));
        jobRepo.delete(job);
        return new ApiResponse(SUCCESS);
    }

    @GetMapping("/run-all")
    @PreAuthorize("hasRole('MANAGER')")
    public ApiResponse runAll() {
        String message = "Running all jobs";
        logger.info(message);
        processorService.process(jobRepo.findAll());
        return new ApiResponse(SUCCESS, message);
    }

    @GetMapping("/run/{jobId}")
    @PreAuthorize("hasRole('MANAGER')")
    public ApiResponse run(@PathVariable Long jobId) {
        ApiResponse response;
        Job job = jobRepo.findById(jobId).get();
        if (job != null) {
            boolean processStarted = processorService.process(job);
            if (processStarted) {
                String message = String.format("Running job %s", job.getName());
                logger.info(message);
                response = new ApiResponse(SUCCESS, message);
            } else {
                String message = String.format("Job %s already in process!", job.getName());
                logger.info(message);
                response = new ApiResponse(INFO, message);
            }
        } else {
            String message = String.format("Job %s not found", jobId);
            logger.info(message);
            response = new ApiResponse(ERROR, message);
        }
        return response;
    }

}
