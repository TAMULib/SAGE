package edu.tamu.sage.controller.handler;

import static edu.tamu.weaver.response.ApiStatus.ERROR;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import edu.tamu.sage.exceptions.SourceFieldsException;
import edu.tamu.sage.exceptions.SourceNotFoundException;
import edu.tamu.sage.exceptions.SourceServiceException;
import edu.tamu.weaver.response.ApiResponse;

@RestController
@ControllerAdvice
public class SourceControllerAdvice {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @ExceptionHandler(SourceFieldsException.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public ApiResponse handleSourceFieldsException(SourceFieldsException exception) {
        String message = exception.getMessage().length() == 0 ? "Failed to process source fields." : exception.getMessage();
        logger.debug(message, exception);
        return new ApiResponse(ERROR, message);
    }

    @ExceptionHandler(SourceNotFoundException.class)
    @ResponseStatus(value = HttpStatus.SERVICE_UNAVAILABLE)
    @ResponseBody
    public ApiResponse handleSourceNotFoundException(SourceNotFoundException exception) {
        String message = exception.getMessage().length() == 0 ? "Failed to connect to source service." : exception.getMessage();
        logger.debug(message, exception);
        return new ApiResponse(ERROR, message);
    }

    @ExceptionHandler(SourceServiceException.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public ApiResponse handleSourceServiceException(SourceServiceException exception) {
        String message = exception.getMessage().length() == 0 ? "Failed to access source service." : exception.getMessage();
        logger.debug(message, exception);
        return new ApiResponse(ERROR, message);
    }

}
