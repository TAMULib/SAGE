package edu.tamu.sage.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

import edu.tamu.weaver.validation.model.ValidatingBaseEntity;

@Entity
public class Field extends ValidatingBaseEntity {

    @NotNull
    @Column(nullable = false)
    private String name;

    @NotNull
    @Column(nullable = false)
    private String schemaMapping;

    public Field() {}

    public Field(String name, String schemaMapping) {
        setName(name);
        setSchemaMapping(schemaMapping);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSchemaMapping() {
        return schemaMapping;
    }

    public void setSchemaMapping(String schemaMapping) {
        this.schemaMapping = schemaMapping;
    }
}
