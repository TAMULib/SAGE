package edu.tamu.sage.model.response;

public class ResultField {
    
    String Key;
    String Value;
    
    public ResultField(String key, String value) {
        this.Key = key;
        this.Value = value;
    }

    public String getKey() {
        return Key;
    }

    public void setKey(String key) {
        Key = key;
    }

    public String getValue() {
        return Value;
    }

    public void setValue(String value) {
        Value = value;
    }

    public static ResultField of(String key, String value) {
        return new ResultField(key, value);
    }

}
