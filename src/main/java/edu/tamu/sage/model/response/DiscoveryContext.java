package edu.tamu.sage.model.response;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import edu.tamu.sage.model.DiscoveryView;

public class DiscoveryContext implements Serializable {

    private static final long serialVersionUID = 6808155032067806535L;
    
    private String name;
    
    private List<Map<String, String>> results;
    
    public DiscoveryContext() {}
    
    public DiscoveryContext(String name, List<Map<String, String>> results) {
        this.name = name;
        this.results = results;
    }
    
    public static DiscoveryContext of(DiscoveryView discoveryView, List<Map<String, String>> results) {
        return new DiscoveryContext(discoveryView.getName(), results);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public List<Map<String, String>> getResultsMap() {
        return results;
    }

    public void setResultsMap(List<Map<String, String>> results) {
        this.results = results;
    }
}
