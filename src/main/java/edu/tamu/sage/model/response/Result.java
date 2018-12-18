package edu.tamu.sage.model.response;

import java.util.HashMap;
import java.util.Map;

import org.apache.solr.common.SolrDocument;

import edu.tamu.sage.model.DiscoveryView;
import edu.tamu.sage.model.MetadataField;

public class Result {

    private String title;

    private String uniqueIdentifier;
    
    private boolean inList;
    
    private boolean inGrid;
    
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

    public boolean isInList() {
        return inList;
    }

    public void setInList(boolean inList) {
        this.inList = inList;
    }

    public boolean isInGrid() {
        return inGrid;
    }

    public void setInGrid(boolean inGrid) {
        this.inGrid = inGrid;
    }

    public static Result of(SolrDocument doc, DiscoveryView discoveryView) {
        Result result = new Result();
        Object title = doc.getFieldValue(discoveryView.getTitleKey());
        if(title!=null) {
            result.setTitle(title.toString());
        }
        Object id = doc.getFieldValue(discoveryView.getUniqueIdentifierKey());
        if(id!=null) {
            result.setUniqueIdentifier(id.toString());
        }
        for (MetadataField mf : discoveryView.getResultMetadataFields()) {
            Object value = doc.getFieldValue(mf.getKey());
            result.inList = mf.isInList();
            result.inGrid = mf.isInGrid();
            result.fields.put(mf.getLabel(), value != null ? value.toString() : "uknown");
        }
        return result;
    }

}
