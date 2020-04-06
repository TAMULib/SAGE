package edu.tamu.sage.model.response;

import static edu.tamu.sage.utility.ValueTemplateUtility.compileTemplate;

import java.util.ArrayList;
import java.util.List;

import org.apache.solr.common.SolrDocument;

import edu.tamu.sage.model.DiscoveryView;
import edu.tamu.sage.model.MetadataField;

public class SingleResultContext {

    private String title;

    private String uniqueIdentifier;

    private String resourceThumbnailUri;

    private String resourceLocationUri;

    private String manifestUri;

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

    public String getManifestUri() {
        return manifestUri;
    }

    public void setManifestUri(String manifestUri) {
        this.manifestUri = manifestUri;
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
        src.setManifestUri(compileTemplate(dv.getManifestUriKey(), solrDocument));

        for (MetadataField mf : dv.getResultMetadataFields()) {
            Object value = solrDocument.getFieldValue(mf.getKey());
            if (value != null) {
                src.resultMetadataFields.add(ResultMetadataField.of(mf, value.toString()));
            }
        }

        return src;
    }
}
