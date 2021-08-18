package edu.tamu.sage.model.response;

import static edu.tamu.sage.utility.ValueTemplateUtility.compileTemplateEntry;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.solr.common.SolrDocument;

import edu.tamu.sage.model.DiscoveryView;
import edu.tamu.sage.model.MetadataField;

public class SingleResultContext {

    private static final String PREFERRED_PLAYER_KEY = "preferred_player";

    private String title;

    private String uniqueIdentifier;

    private String resourceThumbnailUri;

    private String resourceLocationUri;

    private String manifestUri;

    private List<ResultMetadataField> resultMetadataFields;

    private String preferedPlayer;

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

    public String getPreferedPlayer() {
        return this.preferedPlayer;
    }

    public void setPreferedPlayer(String preferedPlayer) {
        this.preferedPlayer = preferedPlayer;
    }

    public static SingleResultContext of(DiscoveryView dv, SolrDocument solrDocument) {
        SingleResultContext src = buildSingleResult(dv, solrDocument);

        for (MetadataField mf : dv.getResultMetadataFields()) {
            Object value = solrDocument.getFieldValue(mf.getKey());
            if (value != null) {
                src.resultMetadataFields.add(ResultMetadataField.of(mf, value.toString()));
            }
        }
        return src;
    }

    public static SingleResultContext fullViewOf(DiscoveryView dv, SolrDocument solrDocument) {
        SingleResultContext src = buildSingleResult(dv, solrDocument);

        Map<String, Collection<Object>> fields = solrDocument.getFieldValuesMap();
        fields.keySet().forEach(k -> {
            src.resultMetadataFields.add(ResultMetadataField.of(k, solrDocument.getFieldValue(k).toString()));
        });
        return src;
    }

    private static SingleResultContext buildSingleResult(DiscoveryView dv, SolrDocument solrDocument) {
        SingleResultContext src = new SingleResultContext();

        Optional<String> titleOption = compileTemplateEntry(dv.getTitleKey(), solrDocument);
        Optional<String> uniqueIdOption = compileTemplateEntry(dv.getUniqueIdentifierKey(), solrDocument);
        Optional<String> locationOption = compileTemplateEntry(dv.getResourceLocationUriKey(), solrDocument);
        Optional<String> thumbnailOption = compileTemplateEntry(dv.getResourceThumbnailUriKey(), solrDocument);
        Optional<String> manifestOption = compileTemplateEntry(dv.getManifestUriKey(), solrDocument);
        Optional<Object> preferredPlayerOption = Optional.ofNullable(solrDocument.getFirstValue(PREFERRED_PLAYER_KEY));

        if (titleOption.isPresent()) {
            src.setTitle(titleOption.get());
        }
        if (uniqueIdOption.isPresent()) {
            src.setUniqueIdentifier(uniqueIdOption.get());
        }
        if (locationOption.isPresent()) {
            src.setResourceLocationUri(locationOption.get());
        }
        if (thumbnailOption.isPresent()) {
            src.setResourceThumbnailUri(thumbnailOption.get());
        }
        if (manifestOption.isPresent()) {
            src.setManifestUri(manifestOption.get());
        }
        if (preferredPlayerOption.isPresent()) {
            src.setPreferedPlayer(preferredPlayerOption.get().toString().split("\"")[1]);
        }

        return src;
    }
}
