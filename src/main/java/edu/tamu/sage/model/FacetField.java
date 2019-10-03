package edu.tamu.sage.model;

import javax.persistence.Embeddable;

@Embeddable
public class FacetField {
    
    private String key;
    
    private String label;
    
    private String type;
    
    private String widget;
    
    public FacetField() {
        super();
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    
    public String getWidget() {
        return widget;
    }

    public void setWidget(String widget) {
        this.widget = widget;
    }

}
