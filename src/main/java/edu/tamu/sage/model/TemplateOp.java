package edu.tamu.sage.model;

import java.util.Map;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import edu.tamu.sage.utility.ValueTemplateUtility;

@Entity
@DiscriminatorValue("Template")
public class TemplateOp extends BasicOp {

    public final static String TYPE = "TEMPLATE_OP";

    public TemplateOp() {
        super();
        setType(TYPE);
    }

    public TemplateOp(String field, String value) {
        this();
        setField(field);
        setValue(value);
    }

    public TemplateOp(String name, String field, String value) {
        this(field, value);
        setName(name);
    }

    @Override
    public void process(Reader reader, Map<String, Object> sageDoc) {
        sageDoc.put(getField(), ValueTemplateUtility.compileTemplate(getValue(), sageDoc));
    }

    @Override
    public String getType() {
        return TYPE;
    }

}
