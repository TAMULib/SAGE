package edu.tamu.sage.model.response;

import org.apache.solr.common.util.SimpleOrderedMap;

public class SolrField {

    private String name;
    private String type;
    private boolean repeatable;

    public SolrField() {
        repeatable = false;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public boolean isRepeatable() {
        return repeatable;
    }

    public void setRepeatable(boolean repeatable) {
        this.repeatable = repeatable;
    }

    public static SolrField of(SimpleOrderedMap field) {
        SolrField solrField = new SolrField();
        solrField.setName((String) field.get("name"));
        solrField.setType((String) field.get("type"));
        
        Object key;
        if ((key = field.get("multiValued")) != null) {
            solrField.setRepeatable((Boolean) key);
        }
        
        return solrField;
    }

}
