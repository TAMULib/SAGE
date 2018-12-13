package edu.tamu.sage.model.response;

import org.apache.solr.client.solrj.response.FacetField;

import edu.tamu.sage.model.FacetFields;

public class FacetFilter {

    private String label;
    private String key;
    private String widget;
    private String type;
    private int count;

    public FacetFilter() {
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

    public String getWidget() {
        return widget;
    }

    public void setWidget(String widget) {
        this.widget = widget;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public static FacetFilter of(FacetField solrFacetField, FacetFields facetField) {
        FacetFilter facetFilter = new FacetFilter();
        facetFilter.label = facetField.getLabel();
        facetFilter.key = facetField.getKey();
        facetFilter.type = facetField.getType();
        facetFilter.widget = facetField.getWidget();
        facetFilter.count = solrFacetField.getValueCount();
        return facetFilter;
    }
    
    

}
