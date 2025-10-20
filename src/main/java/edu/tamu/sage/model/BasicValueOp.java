package edu.tamu.sage.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import edu.tamu.sage.model.validation.BasicValueOpValidator;

@Entity
public abstract class BasicValueOp extends BasicOp {

    @Column(nullable = true, name = "\"value\"")
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
