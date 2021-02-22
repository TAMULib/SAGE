package edu.tamu.sage.model;

import javax.persistence.Column;
import javax.persistence.Entity;

import edu.tamu.sage.model.validation.BasicValueOpValidator;

@Entity
public abstract class BasicValueOp extends BasicOp {

    @Column(nullable = true)
    private String value;

    public BasicValueOp() {
        super();
        setModelValidator(new BasicValueOpValidator());
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

}
