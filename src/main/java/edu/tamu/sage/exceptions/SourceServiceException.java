package edu.tamu.sage.exceptions;

public class SourceServiceException extends RuntimeException {

    private static final long serialVersionUID = -546174397174413716L;

    public SourceServiceException() {
        super();
    }

    public SourceServiceException(String message) {
        super(message);
    }

    public SourceServiceException(String message, Throwable e) {
        super(message, e);
    }

}
