package edu.tamu.sage.model;

import java.util.List;

public interface Reader {
    
    public String getName();
    public void setName(String name);
    
    public SolrCore getSolrCore();
    public void setSolrCore(SolrCore solrCore);

    public List<Field> getFields();
    public void setFields(List<Field> fields);
    public void addField(Field field);
    public void removeField(Field field);
}
