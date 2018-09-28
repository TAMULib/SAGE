package edu.tamu.sage.model;

import java.util.List;

public interface Readable {

    public String getName();
    public void setName(String name);

    public Source getSource();
    public void setSource(Source source);

    public List<Field> getFields();
    public void setFields(List<Field> fields);
    public void addField(Field field);
    public void removeField(Field field);

    public String getSortTitle();
    public String getSortId();

    public String getFilter();
}
