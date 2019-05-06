package edu.tamu.sage.model;

import javax.persistence.Column;
import javax.persistence.Entity;

import edu.tamu.sage.model.validation.InternalMetadatumValidator;
import edu.tamu.weaver.validation.model.ValidatingBaseEntity;

@Entity
public class InternalMetadatum extends ValidatingBaseEntity {

    @Column(nullable = false)
    private String gloss;

    @Column(nullable = false)
    private String field;

    public InternalMetadatum() {
        super();
        setModelValidator(new InternalMetadatumValidator());
    }

    public InternalMetadatum(String gloss, String field) {
        this();
        setGloss(gloss);
        setField(field);
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

}
