package edu.tamu.sage.model.response;

public class Filter {
    
    private String key;
    
    private String value;
    
    public Filter() {
        super();
        // TODO Auto-generated constructor stub
    }

    public Filter(String k, String v) {
        this.key = k;
        this.value = v;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
    
}
