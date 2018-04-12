package edu.tamu.sage.model;

import java.util.List;

public interface Core {

    public String getName();
    public void setName(String name);
    
    public String getUri();
    public void setUri(String uri);
    
    public String getUsername();
    public void setUsername(String username);
    
    public String getPassword();
    public void setPassword(String password);
    
    public List<Field> getFields();
    public void setFields(List<Field> fields);
    public void addField(Field field);
    public void removeField(Field field);
    
}
