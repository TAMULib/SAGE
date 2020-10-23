package edu.tamu.sage.model;

import java.util.Base64;
import java.util.Collection;
import java.util.Map;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import edu.tamu.sage.model.validation.Base64EncodeOpValidator;

@Entity
@DiscriminatorValue("Base64Encode")
public class Base64EncodeOp extends BasicOp {

    public final static String TYPE = "BASE_64_ENCODE_OP";

    public Base64EncodeOp() {
        super();
        setType(TYPE);
        setModelValidator(new Base64EncodeOpValidator());
    }

    public Base64EncodeOp(String field) {
        this();
        setField(field);
    }

    @Override
    public void process(Reader reader, Map<String, Collection<Object>> sageDoc) {
        if (sageDoc.containsKey(getField())) {
            sageDoc.get(getField()).forEach(value -> value = Base64.getEncoder().encode(value.toString().getBytes()));
        }
    }

    @Override
    public String getType() {
        return TYPE;
    }

}
