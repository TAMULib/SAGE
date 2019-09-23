package edu.tamu.sage.exceptions;

public class SourceFieldsException extends SourceServiceException {

    private static final long serialVersionUID = 8294513392525596154L;

    public SourceFieldsException() {
        super();
    }

    public SourceFieldsException(String message) {
        super(message);
    }

    public SourceFieldsException(String message, Throwable e) {
        super(message, e);
    }

}
