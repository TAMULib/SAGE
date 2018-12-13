package edu.tamu.sage.model.response;

import java.util.HashMap;
import java.util.Map;

import org.apache.solr.common.SolrDocument;

import edu.tamu.sage.model.DiscoveryView;
import edu.tamu.sage.model.MetadataField;

public class Result {

    private String title;

    private String uniqueIdentifier;

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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUniqueIdentifier() {
        return uniqueIdentifier;
    }

    public void setUniqueIdentifier(String uniqueIdentifier) {
        this.uniqueIdentifier = uniqueIdentifier;
    }

    public static Result of(SolrDocument doc, DiscoveryView discoveryView) {
        Result result = new Result();
        result.setTitle(doc.getFieldValue(discoveryView.getTitleKey()).toString());
        result.setUniqueIdentifier(doc.getFieldValue(discoveryView.getUniqueIdentifierKey()).toString());
        for
         (MetadataField mf : discoveryView.getResultMetadataFields()) {
            result.fields.put(mf.getLabel(), doc.getFieldValue(mf.getKey()).toString());
        }
        return result;
    }

}
