package edu.tamu.sage.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

import edu.tamu.sage.model.validation.BasicOpValidator;

@Entity
public abstract class BasicOp extends BaseOp {

    @NotNull
    @Column(nullable = false)
    private String field;

    public BasicOp() {
        super();
        setModelValidator(new BasicOpValidator());
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

}
