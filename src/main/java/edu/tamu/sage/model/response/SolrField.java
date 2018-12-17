package edu.tamu.sage.model.response;

import java.util.Map.Entry;

import org.apache.solr.client.solrj.response.LukeResponse.FieldInfo;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class SolrField {

    // <str name="I">Indexed</str>
    // <str name="T">Tokenized</str>
    // <str name="S">Stored</str>
    // <str name="M">Multivalued</str>
    // <str name="V">TermVector Stored</str>
    // <str name="o">Store Offset With TermVector</str>
    // <str name="p">Store Position With TermVector</str>
    // <str name="O">Omit Norms</str>
    // <str name="L">Lazy</str>
    // <str name="B">Binary</str>
    // <str name="f">Sort Missing First</str>
    // <str name="l">Sort Missing Last</str>

    private String name;

    @JsonIgnore
    private String schema;

    private String type;

    private int distinct;

    public SolrField() {
        super();
        distinct = 0;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSchema() {
        return schema;
    }

    public void setSchema(String schema) {
        this.schema = schema;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setDistinct(int distinct) {
        this.distinct = distinct;
    }

    public boolean isIndexed() {
        return schema != null ? schema.contains("I") : false;
    }

    public boolean isTokenized() {
        return schema != null ? schema.contains("T") : false;
    }

    public boolean isStored() {
        return schema != null ? schema.contains("S") : false;
    }

    public boolean isMultivalued() {
        return schema != null ? schema.contains("M") : false;
    }

    public boolean isDistinct() {
        return distinct == 1;
    }

    public static SolrField of(Entry<String, FieldInfo> field) {
        SolrField solrField = new SolrField();
        FieldInfo info = field.getValue();
        solrField.setType(info.getType());
        solrField.setSchema(info.getSchema());
        solrField.setName(info.getName());
        solrField.setDistinct(info.getDistinct());
        return solrField;
    }

}
