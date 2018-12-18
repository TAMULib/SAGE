package edu.tamu.sage.model.response;

import edu.tamu.sage.model.MetadataField;

public class SortField {

    private String label;
    private String key;
    private String type;

    public SortField() {
        super();
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

	public static SortField of(MetadataField metadataField) {
        SortField sf = new SortField();

        sf.setKey(metadataField.getKey());
        sf.setLabel(metadataField.getLabel());
        sf.setType(metadataField.getType());

		return sf;
	}

}
