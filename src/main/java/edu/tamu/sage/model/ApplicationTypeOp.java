package edu.tamu.sage.model;

import java.util.Map;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import edu.tamu.sage.model.validation.ApplicationTypeOpValidator;

@Entity
@DiscriminatorValue("ApplicationType")
public class ApplicationTypeOp extends BasicOp {

    public final static String TYPE = "APPLICATION_TYPE_OP";

    public ApplicationTypeOp() {
        super();
        setType(TYPE);
        setModelValidator(new ApplicationTypeOpValidator());
    }

    public ApplicationTypeOp(String field) {
        this();
        setField(field);
    }

    @Override
    public void process(Reader reader, Map<String, String> sageDoc) {
        sageDoc.put(getField(), reader.getSource().getApplicationType().getName());
    }

    @Override
    public String getType() {
        return TYPE;
    }

}
