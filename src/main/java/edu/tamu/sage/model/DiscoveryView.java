package edu.tamu.sage.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import edu.tamu.sage.model.validation.DiscoveryViewValidator;
import edu.tamu.weaver.validation.model.ValidatingBaseEntity;

@Entity
public class DiscoveryView extends ValidatingBaseEntity {
    
    @Column(unique=true)
    private String name;
    
    @ManyToOne
    private Source source;
    
    @Column
    private String filter;
    
    @Column
    private String slug;

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
    
    
    
}
