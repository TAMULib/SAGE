package edu.tamu.sage.model.response;

import java.io.Serializable;
import java.util.List;

import edu.tamu.sage.model.DiscoveryView;

public class DiscoveryContext implements Serializable {

    private static final long serialVersionUID = 6808155032067806535L;
    
    private String name;
    
    private String titleKey;

    private String uriKey;
    
    private List<Result> results;
    
    private List<SolrField> fields;

    
    public DiscoveryContext() {
        super();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public String getTitleKey() {
        return titleKey;
    }

    public void setTitleKey(String titleKey) {
        this.titleKey = titleKey;
    }
    
    public String getUriKey() {
        return uriKey;
    }

    public void setUriKey(String uriKey) {
        this.uriKey = uriKey;
    }

    public List<Result> getResults() {
        return results;
    }

    public void setResults(List<Result> results) {
        this.results = results;
    }

    public List<SolrField> getFields() {
        return fields;
    }

    public void setFields(List<SolrField> fields) {
        this.fields = fields;
    }

    public static DiscoveryContext of(DiscoveryView dv) {
        DiscoveryContext dc = new DiscoveryContext();
        
        dc.setName(dv.getName());
        dc.setTitleKey(dv.getPrimaryKey());
        dc.setUriKey(dv.getPrimaryURIKey());
        
        return dc;
    }
}
