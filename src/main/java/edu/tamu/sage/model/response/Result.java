package edu.tamu.sage.model.response;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.apache.solr.common.SolrDocument;

public class Result {

    private Map<String, String> fields;
    
    public Result() {
        this.fields = new HashMap<String, String>();
    }
    
    public Map<String, String> getFields() {
        return fields;
    }

    public void setFields(Map<String, String> fields) {
        this.fields = fields;
    }

    public static Result of(SolrDocument doc, Collection<String> fieldNames) {
        Result result = new Result();
        for (String s: fieldNames) {
            result.fields.put(s, doc.getFieldValue(s).toString());
        }
        return result;
    }
    
}
