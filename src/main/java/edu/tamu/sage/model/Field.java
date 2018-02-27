package edu.tamu.sage.model;

import javax.persistence.Column;
import javax.persistence.Entity;

import edu.tamu.weaver.validation.model.ValidatingBaseEntity;

@Entity
public class Field extends ValidatingBaseEntity {
    
    @Column(unique = true)
    private String name;
    
    @Column
    private String value;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
    
}
