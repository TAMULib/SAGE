package edu.tamu.sage.model;

import java.util.Map;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("Default")
public class DefaultOp extends BasicOp {

    public DefaultOp() {
        super();
    }

    public DefaultOp(String field, String value) {
        this();
        setField(field);
        setValue(value);
    }

    public DefaultOp(String name, String field, String value) {
        this(field, value);
        setName(name);
    }

    @Override
    public void process(Map<String, String> sageDoc) {
        if (!sageDoc.containsKey(getField())) {
            sageDoc.put(getField(), getValue());
        }
    }

}
