package edu.tamu.sage.model;

import java.util.List;

public interface Writer {
    
    public String getName();
    public void setName(String name);
    
    public SolrCore getSolrCore();
    public void setSolrCore(SolrCore solrCore);

    public List<OutputMapping> getOutputMapping();
    public void setOutputMapping(List<OutputMapping> outputMapping);
}