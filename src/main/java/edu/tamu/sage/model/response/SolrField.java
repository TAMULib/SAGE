package edu.tamu.sage.model.response;

import java.util.Map.Entry;

import org.apache.solr.client.solrj.response.LukeResponse.FieldInfo;

public class SolrField {

    private String name;
    private String type;

    public SolrField() {
        super();
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

    public static SolrField of(Entry<String, FieldInfo> field) {
        SolrField solrField = new SolrField();
        FieldInfo info = field.getValue();
        solrField.setType(info.getType());
        solrField.setName(info.getName());
        return solrField;
    }

}
