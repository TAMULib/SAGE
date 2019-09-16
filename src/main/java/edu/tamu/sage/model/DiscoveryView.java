package edu.tamu.sage.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import edu.tamu.sage.model.validation.DiscoveryViewValidator;
import edu.tamu.weaver.validation.model.ValidatingBaseEntity;

@Entity
public class DiscoveryView extends ValidatingBaseEntity {

    @NotNull
    @Column(nullable = false)
    private String name;

    @ManyToOne
    private Source source;

    @NotNull
    @Column(nullable = false)
    private String filter;

    @NotNull
    @Column(nullable = false)
    private String titleKey;

    @NotNull
    @Column(nullable = false)
    private String resourceThumbnailUriKey;

    @NotNull
    @Column(nullable = false)
    private String resourceLocationUriKey;

    @NotNull
    @Column(nullable = false)
    private String uniqueIdentifierKey;

    @NotNull
    @Column(unique = true, nullable = false)
    private String slug;

    @NotNull
    @Column(length = 4096, nullable = false)
    private String infoText;

    @NotNull
    @Column(nullable = false)
    private String infoLinkText;

    @NotNull
    @Column(nullable = false)
    private String infoLinkUrl;

    @ElementCollection
    private List<MetadataField> resultMetadataFields;

    @ElementCollection
    private List<FacetFields> facetFields;

    public DiscoveryView() {
        setModelValidator(new DiscoveryViewValidator());
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Source getSource() {
        return source;
    }

    public void setSource(Source source) {
        this.source = source;
    }

    public String getFilter() {
        return filter;
    }

    public void setFilter(String filter) {
        this.filter = filter;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getTitleKey() {
        return titleKey;
    }

    public void setTitleKey(String titleKey) {
        this.titleKey = titleKey;
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

    public String getUniqueIdentifierKey() {
        return uniqueIdentifierKey;
    }

    public void setUniqueIdentifierKey(String uniqueIdentifierKey) {
        this.uniqueIdentifierKey = uniqueIdentifierKey;
    }

    public String getInfoText() {
        return infoText;
    }

    public void setInfoText(String infoText) {
        this.infoText = infoText;
    }

    public String getInfoLinkText() {
        return infoLinkText;
    }

    public void setInfoLinkText(String infoLinkText) {
        this.infoLinkText = infoLinkText;
    }

    public String getInfoLinkUrl() {
        return infoLinkUrl;
    }

    public void setInfoLinkUrl(String infoLinkUrl) {
        this.infoLinkUrl = infoLinkUrl;
    }

    public List<MetadataField> getResultMetadataFields() {
        return resultMetadataFields;
    }

    public void setResultMetadataFields(List<MetadataField> resultMetadataFields) {
        this.resultMetadataFields = resultMetadataFields;
    }

    public MetadataField findMetadataFieldByKey(String key) {
        MetadataField m = null;
        for (MetadataField rm : resultMetadataFields) {
            if (rm.getKey().equals(key)) {
                m = rm;
                break;
            }
        }
        return m;
    }

    public FacetFields findFacetFieldByKey(String key) {
        FacetFields f = null;
        for (FacetFields ff : facetFields) {
            if (ff.getKey().equals(key)) {
                f = ff;
                break;
            }
        }
        return f;
    }

    public List<FacetFields> getFacetFields() {
        return facetFields;
    }

    public void setFacetFields(List<FacetFields> facetFields) {
        this.facetFields = facetFields;
    }

}
