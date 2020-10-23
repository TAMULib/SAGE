package edu.tamu.sage.model;

import java.util.Collection;
import java.util.Map;

public interface Operator {

    public void process(Reader reader, Map<String, Collection<Object>> sageDocument);

}
