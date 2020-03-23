package edu.tamu.sage.model;

import java.util.Map;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("Constant")
public class ConstantOp extends BasicOp {

    public final static String TYPE = "CONSTANT_OP";

    public ConstantOp() {
        super();
        setType(TYPE);
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
    public void process(Reader reader, Map<String, String> sageDoc) {
        sageDoc.put(getField(), getValue());
    }

    @Override
    public String getType() {
        return TYPE;
    }

}
