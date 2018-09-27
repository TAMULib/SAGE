package edu.tamu.sage.controller;

import static edu.tamu.weaver.response.ApiStatus.SUCCESS;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.tamu.sage.service.SimpleProcessorService;
import edu.tamu.weaver.response.ApiResponse;

@RestController
@RequestMapping("/processor")
public class ProcessorController {

    @Autowired
    private SimpleProcessorService processorService;

    @RequestMapping("/run-all")
    @PreAuthorize("hasRole('ANONYMOUS')")
    public ApiResponse runAll() {
        processorService.process(null);
        return new ApiResponse(SUCCESS);
    }

    @RequestMapping("/run/{jobId}")
    @PreAuthorize("hasRole('ANONYMOUS')")
    public ApiResponse run(@PathVariable String jobId) {
        Map<String,String> configuration = new HashMap<String,String>();
        configuration.put("jobId", jobId);
        processorService.process(configuration);
        return new ApiResponse(SUCCESS);
    }

}
