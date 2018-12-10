package edu.tamu.sage.controller.handler;

import static edu.tamu.weaver.response.ApiStatus.ERROR;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import edu.tamu.sage.exceptions.DiscoveryContextNotFoundException;
import edu.tamu.weaver.response.ApiResponse;

@RestController
@ControllerAdvice
public class DiscoveryViewControllerAdvice {
    
    @ResponseStatus(value = HttpStatus.OK)
    @ExceptionHandler(DiscoveryContextNotFoundException.class)
    public ApiResponse handleFcrepoOperationFailedException(DiscoveryContextNotFoundException e) {
        return new ApiResponse(ERROR, e.getMessage());
    }

}
