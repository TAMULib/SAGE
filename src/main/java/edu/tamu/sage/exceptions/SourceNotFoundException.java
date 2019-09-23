package edu.tamu.sage.exceptions;

public class SourceNotFoundException extends SourceServiceException {

    private static final long serialVersionUID = -276094005758215635L;

    public SourceNotFoundException() {
        super();
    }

    public SourceNotFoundException(String message) {
        super(message);
    }

    public SourceNotFoundException(String message, Throwable e) {
        super(message, e);
    }

}
