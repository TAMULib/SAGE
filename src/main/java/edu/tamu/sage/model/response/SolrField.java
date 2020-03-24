package edu.tamu.sage.model.response;

import org.apache.commons.lang3.StringUtils;
import org.apache.solr.client.solrj.response.LukeResponse.FieldInfo;

import com.fasterxml.jackson.databind.JsonNode;

public class SolrField {

    private String name;

    private String type;

    private boolean multiValued;

    private boolean indexed;

    private boolean stored;

    public SolrField() {
        super();
        setMultiValued(false);
        setIndexed(false);
        setStored(false);
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

    public boolean isMultiValued() {
        return multiValued;
    }

    public void setMultiValued(boolean multiValued) {
        this.multiValued = multiValued;
    }

    public boolean isIndexed() {
        return indexed;
    }

    public void setIndexed(boolean indexed) {
        this.indexed = indexed;
    }

    public boolean isStored() {
        return stored;
    }

    public void setStored(boolean stored) {
        this.stored = stored;
    }

    public static SolrField from(FieldInfo info) {
        SolrField field = new SolrField();
        field.setType(info.getType());
        field.setName(info.getName());
        String schema = info.getSchema();
        if (StringUtils.isNotEmpty(schema)) {
            field.setMultiValued(schema.contains("M"));
            field.setIndexed(schema.contains("I"));
            field.setStored(schema.contains("S"));
        }
        return field;
    }

    public static SolrField from(JsonNode fieldNode) {
        SolrField field = new SolrField();
        field.setType(fieldNode.get("type").asText());
        field.setName(fieldNode.get("name").asText());
        field.setMultiValued(fieldNode.has("multiValued") ? fieldNode.get("multiValued").asBoolean() : false);
        field.setIndexed(fieldNode.has("indexed") ? fieldNode.get("indexed").asBoolean() : false);
        field.setStored(fieldNode.has("stored") ? fieldNode.get("stored").asBoolean() : false);
        return field;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this) {
            return true;
        }
        if (!(o instanceof SolrField)) {
            return false;
        }
        SolrField other = (SolrField) o;
        return name.equals(other.name);
    }

    // Idea from effective Java : Item 9
    @Override
    public int hashCode() {
        int result = 31;
        result = 73 * result + name.hashCode();
        return result;
    }

}
