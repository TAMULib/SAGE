package edu.tamu.sage.model;

import java.util.Collection;
import java.util.Map;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import edu.tamu.sage.model.validation.RegexReplaceOpValidator;

@Entity
@DiscriminatorValue("RegexReplace")
public class RegexReplaceOp extends BasicOp {

    public final static String TYPE = "REGEX_REPLACE_OP";

    private String regex;

    public RegexReplaceOp() {
        super();
        setType(TYPE);
        setModelValidator(new RegexReplaceOpValidator());
    }

    public RegexReplaceOp(String field, String value) {
        this();
        setField(field);
        setValue(value);
    }

    public RegexReplaceOp(String name, String field, String value) {
        this(field, value);
        setName(name);
    }

    public RegexReplaceOp(String name, String field, String value, String regex) {
        this(field, value);
        setName(name);
    }

    @Override
    public void process(Reader reader, Map<String, Collection<Object>> sageDoc) {
        if (sageDoc.containsKey(getField())) {
            sageDoc.get(getField()).forEach(value -> {
                value = value.toString().replaceAll(regex, getValue());
            });
        }
    }

    @Override
    public String getType() {
        return TYPE;
    }

    public String getRegex() {
        return regex;
    }

    public void setRegex(String regex) {
        this.regex = regex;
    }

}
