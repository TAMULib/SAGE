package edu.tamu.sage.model.response;

import java.io.Serializable;
import java.util.List;

import edu.tamu.sage.model.DiscoveryView;

public class DiscoveryContext implements Serializable {

    private static final long serialVersionUID = 6808155032067806535L;
    
    private String name;
    
    private List<Result> results;
    
    public DiscoveryContext() {}
    
    public DiscoveryContext(String name, List<Result> results) {
        this.name = name;
        this.results = results;
    }
    
    public static DiscoveryContext of(DiscoveryView discoveryView, List<Result> results) {
        return new DiscoveryContext(discoveryView.getName(), results);
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
}
