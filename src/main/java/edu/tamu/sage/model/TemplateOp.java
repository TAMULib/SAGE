package edu.tamu.sage.model;

import java.util.Arrays;
import java.util.Collection;
import java.util.Map;
import java.util.Optional;

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
    public void process(Reader reader, Map<String, Collection<Object>> sageDoc) {
        Optional<String> option = ValueTemplateUtility.compileTemplate(getValue(), sageDoc);
        if (!sageDoc.containsKey(getField()) && option.isPresent()) {
            sageDoc.put(getField(), Arrays.asList(option.get()));
        }
    }

    @Override
    public String getType() {
        return TYPE;
    }

}
