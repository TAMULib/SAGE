package edu.tamu.sage.model.response;

import static edu.tamu.sage.utility.ValueTemplateUtility.compileTemplate;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;

import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocument;

import edu.tamu.sage.model.DiscoveryView;
import edu.tamu.sage.model.MetadataField;

public class SingleResultContext implements Serializable {

    private static final long serialVersionUID = 6808155032067806535L;
    
    private String title;
    
    private String uniqueIdentifier;
    
    private String resourceThumbnailUri;
    
    private String resourceLocationUri;
    
    private List<ResultMetadataField> resultMetadataFields;

    public SingleResultContext() {
        super();
        resultMetadataFields = new ArrayList<ResultMetadataField>();
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

    public String getResourceThumbnailUri() {
        return resourceThumbnailUri;
    }

    public void setResourceThumbnailUri(String resourceThumbnailUri) {
        this.resourceThumbnailUri = resourceThumbnailUri;
    }

    public String getResourceLocationUri() {
        return resourceLocationUri;
    }

    public void setResourceLocationUri(String resourceLocationUri) {
        this.resourceLocationUri = resourceLocationUri;
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

    public List<ResultMetadataField> getResultMetadataFields() {
        return resultMetadataFields;
    }

    public void setResultMetadataFields(List<ResultMetadataField> resultMetadataFields) {
        this.resultMetadataFields = resultMetadataFields;
    }

    public static SingleResultContext of(DiscoveryView dv, SolrDocument solrDocument) {
        SingleResultContext src = new SingleResultContext();
        
        src.setTitle(compileTemplate(dv.getTitleKey(), solrDocument));
        src.setUniqueIdentifier(compileTemplate(dv.getUniqueIdentifierKey(), solrDocument));
        src.setResourceLocationUri(compileTemplate(dv.getResourceLocationUriKey(), solrDocument));
        src.setResourceThumbnailUri(compileTemplate(dv.getResourceThumbnailUriKey(), solrDocument));
        
        for (MetadataField mf : dv.getResultMetadataFields()) {
            Object value = solrDocument.getFieldValue(mf.getKey());
            src.resultMetadataFields.add(ResultMetadataField.of(mf,  value != null ? value.toString() : "unavailable"));
        }
        
        return src;
    }
}
