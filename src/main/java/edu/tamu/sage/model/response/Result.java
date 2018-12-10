package edu.tamu.sage.model.response;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.apache.solr.common.SolrDocument;

public class Result {

    private List<ResultField> fields;
    
    public Result() {
        this.fields = new ArrayList<ResultField>();
    }
    
    public List<ResultField> getFields() {
        return fields;
    }

    public void setFields(List<ResultField> fields) {
        this.fields = fields;
    }
    
    public void addResultField(ResultField resultField) {
        this.fields.add(resultField);
    }

    public static Result of(SolrDocument doc, Collection<String> fieldNames) {
        Result result = new Result();
        for (String s: fieldNames) {
            result.addResultField(ResultField.of(s, doc.getFieldValue(s).toString()));
        }
        return result;
    }
    
}
