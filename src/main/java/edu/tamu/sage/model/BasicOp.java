package edu.tamu.sage.model;

import javax.persistence.Column;
import javax.persistence.Entity;

import edu.tamu.sage.model.validation.BasicOpValidator;

@Entity
public abstract class BasicOp extends BaseOp {

    @Column(nullable = false)
    private String field;

    @Column(nullable = false)
    private String value;

    public BasicOp() {
        super();
        setModelValidator(new BasicOpValidator());
    }

    public BasicOp(String field, String value) {
        this();
        setField(field);
        setValue(value);
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

}
