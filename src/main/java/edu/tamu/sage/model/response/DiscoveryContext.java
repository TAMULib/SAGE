package edu.tamu.sage.model.response;

import java.io.Serializable;
import java.util.List;

public class DiscoveryContext implements Serializable {

    private static final long serialVersionUID = 6808155032067806535L;
    
    private String name;
    
    private List<Result> results;
    
    private List<SolrField> fields;

    
    public DiscoveryContext() {
        super();
    }
    
    public DiscoveryContext(String name) {
        this();
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
}
