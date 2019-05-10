package edu.tamu.sage.model;

import java.util.Map;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("Constant")
public class ConstantOp extends BasicOp {

    public ConstantOp() {
        super();
    }

    public ConstantOp(String field, String value) {
        this();
        setField(field);
        setValue(value);
    }

    public ConstantOp(String name, String field, String value) {
        this(field, value);
        setName(name);
    }

    @Override
    public void process(Map<String, String> sageDoc) {
        sageDoc.put(getField(), getValue());
    }

}
