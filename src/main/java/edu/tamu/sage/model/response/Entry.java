package edu.tamu.sage.model.response;

public class Entry {

    private String message;
    private String status;
    private String stage;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStage() {
        return stage;
    }

    public void setStage(String stage) {
        this.stage = stage;
    }

    public static Entry of(String message, String status, String stage) {
        Entry entry = new Entry();
        entry.setMessage(message);
        entry.setStatus(status);
        entry.setStage(stage);

        return entry;
    }

}
