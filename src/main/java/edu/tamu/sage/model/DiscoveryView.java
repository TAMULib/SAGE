package edu.tamu.sage.model;

import javax.persistence.Column;
import javax.persistence.Entity;

import edu.tamu.sage.model.validation.DiscoveryViewValidator;
import edu.tamu.weaver.validation.model.ValidatingBaseEntity;

@Entity
public class DiscoveryView extends ValidatingBaseEntity {
    @Column(unique=true)
    private String name;

    public DiscoveryView() {
        setModelValidator(new DiscoveryViewValidator());
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
}
