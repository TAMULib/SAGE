package edu.tamu.sage.model.response;

import edu.tamu.sage.model.MetadataField;

public class ResultMetadataField {

    private String Key;
    
    private String Label;
    
    private String Value;
    
    private boolean inList;
    
    private boolean inGrid;
    
    private boolean initem;
    
    public ResultMetadataField() {}

    public String getKey() {
        return Key;
    }

    public void setKey(String key) {
        Key = key;
    }

    public String getLabel() {
        return Label;
    }

    public void setLabel(String label) {
        Label = label;
    }

    public String getValue() {
        return Value;
    }

    public void setValue(String value) {
        Value = value;
    }

    public boolean isInList() {
        return inList;
    }

    public void setInList(boolean inList) {
        this.inList = inList;
    }

    public boolean isInGrid() {
        return inGrid;
    }

    public void setInGrid(boolean inGrid) {
        this.inGrid = inGrid;
    }

    public boolean isInitem() {
        return initem;
    }

    public void setInitem(boolean initem) {
        this.initem = initem;
    }
    

    public static ResultMetadataField of(MetadataField mf, String value) {
        ResultMetadataField rmf = new ResultMetadataField();
        
        rmf.setKey(mf.getKey());
        rmf.setLabel(mf.getLabel());
        rmf.setValue(value);
        
        rmf.setInList(mf.isInList());
        rmf.setInGrid(mf.isInGrid());
        
        //mf.getLabel() !=null ? mf.getLabel() : "unavailable", value != null ? value.toString() : "unavailable"
        return rmf;
    }
    
}
