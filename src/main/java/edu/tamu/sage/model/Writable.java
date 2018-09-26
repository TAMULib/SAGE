package edu.tamu.sage.model;

import java.util.List;

public interface Writable {

    public String getName();
    public void setName(String name);

    public Source getSource();
    public void setSource(Source source);

    public List<OutputMapping> getOutputMappings();
    public void setOutputMappings(List<OutputMapping> outputMapping);
}