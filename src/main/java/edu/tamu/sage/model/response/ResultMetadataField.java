package edu.tamu.sage.model.response;

import edu.tamu.sage.model.MetadataField;

public class ResultMetadataField {

    private String Key;

    private String Label;

    private Object Value;

    private boolean inList;

    private boolean inGrid;

    private boolean inSingleResult;

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

    public Object getValue() {
        return Value;
    }

    public void setValue(Object value) {
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

    public boolean isInSingleResult() {
        return inSingleResult;
    }

    public void setInSingleResult(boolean inSingleResult) {
        this.inSingleResult = inSingleResult;
    }


    public static ResultMetadataField of(MetadataField mf, String value) {
        ResultMetadataField rmf = new ResultMetadataField();

        rmf.setKey(mf.getKey());
        rmf.setLabel(mf.getLabel());
        rmf.setValue(value);

        rmf.setInList(mf.isInList());
        rmf.setInGrid(mf.isInGrid());
        rmf.setInSingleResult(mf.isInSingleResult());

        return rmf;
    }

    public static ResultMetadataField of(String field, String value) {
        ResultMetadataField rmf = new ResultMetadataField();

        rmf.setKey(field);
        rmf.setLabel(field);
        rmf.setValue(value);

        rmf.setInList(false);
        rmf.setInGrid(false);
        rmf.setInSingleResult(true);

        return rmf;
    }
}
