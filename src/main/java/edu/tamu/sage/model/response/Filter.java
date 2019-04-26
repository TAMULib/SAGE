package edu.tamu.sage.model.response;

public class Filter {
    
    private String key;
    private String label;
    private String value;
    
    public Filter() {
        super();
        // TODO Auto-generated constructor stub
    }

    public Filter(String k, String l, String v) {
        this.key = k;
        this.label = l;
        this.value = v;
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

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
    
}
