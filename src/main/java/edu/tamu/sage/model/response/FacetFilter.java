package edu.tamu.sage.model.response;

import java.util.HashMap;
import java.util.Map;

import edu.tamu.sage.model.FacetField;

public class FacetFilter {

    private String label;
    private String key;
    private String widget;
    private String type;
    private Map<String, Long> counts;

    public FacetFilter() {
        super();
        counts = new HashMap<String, Long>();
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

    public Map<String, Long> getCounts() {
        return counts;
    }

    public void setCounts(Map<String, Long> counts) {
        this.counts = counts;
    }

    public static FacetFilter of(org.apache.solr.client.solrj.response.FacetField solrFacetField, FacetField facetField) {
        FacetFilter facetFilter = new FacetFilter();
        facetFilter.label = facetField.getLabel();
        facetFilter.key = facetField.getKey();
        facetFilter.type = facetField.getType();
        facetFilter.widget = facetField.getWidget();

        solrFacetField.getValues().forEach(count->{
            facetFilter.counts.put(count.getName(), count.getCount());
        });

        return facetFilter;
    }



}
