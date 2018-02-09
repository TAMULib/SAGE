package edu.tamu.cap.model;

import javax.persistence.Embeddable;

@Embeddable
public class Property {
    
    private String uri;
    
    private String label;
    
    public Property() {}

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
    
}
