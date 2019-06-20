package edu.tamu.sage.model;

import javax.persistence.Column;
import javax.persistence.Entity;

import edu.tamu.sage.model.validation.InternalMetadataValidator;
import edu.tamu.weaver.validation.model.ValidatingBaseEntity;

@Entity
public class InternalMetadata extends ValidatingBaseEntity {

    @Column(nullable = false)
    private String gloss;

    @Column(nullable = false)
    private String field;

    @Column(nullable = false)
    private boolean required;

    public InternalMetadata() {
        super();
        setModelValidator(new InternalMetadataValidator());
        setRequired(false);
    }

    public InternalMetadata(String gloss, String field) {
        this();
        setGloss(gloss);
        setField(field);
    }

    public InternalMetadata(String gloss, String field, boolean required) {
        this(gloss, field);
        setRequired(required);
    }

    public String getGloss() {
        return gloss;
    }

    public void setGloss(String gloss) {
        this.gloss = gloss;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public boolean isRequired() {
        return required;
    }

    public void setRequired(boolean required) {
        this.required = required;
    }

}
