package edu.tamu.sage.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OrderColumn;
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
    private String manifestUriKey;

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

    private String queryParser;

    private String defaultOperand;

    @ElementCollection
    private List<MetadataField> resultMetadataFields;

    @ElementCollection
    private List<FacetField> facetFields;

    @OrderColumn
    @ElementCollection
    private List<SearchField> searchFields;

    @Column
    private String logoUrl;

    @Column
    private String wideLogoUrl;

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

    public String getManifestUriKey() {
        return manifestUriKey;
    }

    public void setManifestUriKey(String manifestUriKey) {
        this.manifestUriKey = manifestUriKey;
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

    public String getQueryParser() {
        return queryParser;
    }

    public void setQueryParser(String queryParser) {
        this.queryParser = queryParser;
    }

    public String getDefaultOperand() {
        return defaultOperand;
    }

    public void setDefaultOperand(String defaultOperand) {
        this.defaultOperand = defaultOperand;
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

    public FacetField findFacetFieldByKey(String key) {
        FacetField f = null;
        for (FacetField ff : facetFields) {
            if (ff.getKey().equals(key)) {
                f = ff;
                break;
            }
        }
        return f;
    }

    public SearchField findSearchFieldByKey(String key) {
        SearchField searchField = null;
        for (SearchField sf : searchFields) {
            if (sf.getKey().equals(key)) {
                searchField = sf;
                break;
            }
        }
        return searchField;
    }

    public List<FacetField> getFacetFields() {
        return facetFields;
    }

    public void setFacetFields(List<FacetField> facetFields) {
        this.facetFields = facetFields;
    }

    public List<SearchField> getSearchFields() {
        return searchFields;
    }

    public void setSearchFields(List<SearchField> searchFields) {
        this.searchFields = searchFields;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public String getWideLogoUrl() {
        return wideLogoUrl;
    }

    public void setWideLogoUrl(String wideLogoUrl) {
        this.wideLogoUrl = wideLogoUrl;
    }

}
