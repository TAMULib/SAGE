package edu.tamu.sage.model.response;

import static edu.tamu.sage.utility.ValueTemplateUtility.compileTemplate;

import java.util.ArrayList;
import java.util.List;

import org.apache.solr.common.SolrDocument;

import edu.tamu.sage.model.DiscoveryView;
import edu.tamu.sage.model.MetadataField;

public class Result {

    private String title;

    private String uniqueIdentifier;

    private String resourceThumbnailUriKey;

    private String resourceLocationUriKey;

    private String manifestUriKey;

    private boolean inList;

    private boolean inGrid;

    private List<ResultMetadataField> fields;

    public Result() {
        this.fields = new ArrayList<ResultMetadataField>();
    }

    public List<ResultMetadataField> getFields() {
        return fields;
    }

    public void setFields(List<ResultMetadataField> fields) {
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

    public String getResourceThumbnailUriKey() {
        return resourceThumbnailUriKey;
    }

    public void setResourceThumbnailUriKey(String resourceThumbnailUriKey) {
        this.resourceThumbnailUriKey = resourceThumbnailUriKey;
    }

    public String getResourceLocationUriKey() {
        return resourceLocationUriKey;
    }

    public void setResourceLocationUriKey(String resourceLocationUriKey) {
        this.resourceLocationUriKey = resourceLocationUriKey;
    }

    public String getManifestUriKey() {
        return manifestUriKey;
    }

    public void setManifestUriKey(String manifestUriKey) {
        this.manifestUriKey = manifestUriKey;
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

        result.setUniqueIdentifier(compileTemplate("{{" + discoveryView.getUniqueIdentifierKey() + "}}", doc));
        result.setTitle(compileTemplate(discoveryView.getTitleKey(), doc));
        result.setResourceLocationUriKey(compileTemplate(discoveryView.getResourceLocationUriKey(), doc));
        result.setResourceThumbnailUriKey(compileTemplate(discoveryView.getResourceThumbnailUriKey(), doc));
        result.setManifestUriKey(compileTemplate(discoveryView.getManifestUriKey(), doc));

        for (MetadataField mf : discoveryView.getResultMetadataFields()) {
            Object value = doc.getFieldValue(mf.getKey());
            result.inList = mf.isInList();
            result.inGrid = mf.isInGrid();
            if (value != null) {
                result.fields.add(ResultMetadataField.of(mf, value.toString()));
            }

        }
        return result;
    }

}
