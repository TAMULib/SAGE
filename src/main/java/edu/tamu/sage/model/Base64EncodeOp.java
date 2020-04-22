package edu.tamu.sage.model;

import java.util.Base64;
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
    public void process(Reader reader, Map<String, Object> sageDoc) {
        if (sageDoc.containsKey(getField())) {
            byte[] encoded = Base64.getEncoder().encode(sageDoc.get(getField()).toString().getBytes());
            sageDoc.put(getField(), new String(encoded));
        }
    }

    @Override
    public String getType() {
        return TYPE;
    }

}
