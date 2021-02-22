package edu.tamu.sage.model;

import java.util.Collection;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

import javax.persistence.DiscriminatorValue;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;

@Entity
@DiscriminatorValue("Mapping")
public class MappingOp extends BasicOp {

    public final static String TYPE = "MAPPING_OP";

    @ElementCollection(fetch = FetchType.EAGER)
    private Map<String, String> mapping;

    public MappingOp() {
        super();
        setType(TYPE);
        setMapping(new HashMap<String, String>());
    }

    public MappingOp(String field, Map<String, String> mapping) {
        this();
        setField(field);
        setMapping(mapping);
    }

    @Override
    public void process(Reader reader, Map<String, Collection<Object>> sageDoc) {
        if (sageDoc.containsKey(getField())) {
            sageDoc.put(getField(), sageDoc.get(getField()).stream()
                .map(item -> getMapping().containsKey(item) ? getMapping().get(item) : item)
                .collect(Collectors.toList()));
        }
    }

    @Override
    public String getType() {
        return TYPE;
    }

    public Map<String, String> getMapping() {
        return this.mapping;
    }

    public void setMapping(Map<String, String> mapping) {
        this.mapping = mapping;
    }

}
