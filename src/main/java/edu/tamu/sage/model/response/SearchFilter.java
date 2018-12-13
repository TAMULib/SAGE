package edu.tamu.sage.model.response;

import edu.tamu.sage.model.MetadataField;

public class SearchFilter {

    private String label;
    private String key;
    private String type;

    public SearchFilter() {
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

	public static SearchFilter of(MetadataField metadataFfield) {
        SearchFilter sf = new SearchFilter();

        sf.setKey(metadataFfield.getKey());
        sf.setLabel(metadataFfield.getLabel());
        sf.setType(metadataFfield.getType());

		return sf;
	}

}
