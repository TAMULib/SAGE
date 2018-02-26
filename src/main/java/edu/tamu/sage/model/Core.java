package edu.tamu.sage.model;

import java.util.Set;

public interface Core {

    public String getName();
    public void setName(String name);
    
    public String getUri();
    public void setUri(String uri);
    
    public String getUsername();
    public void setUsername(String username);
    
    public String getPassword();
    public void setPassword(String password);
    
    public Set<Field> getFields();
    public void setFields(Set<Field> fields);
    public void addField(Field field);
    public void removeField(Field field);
    
}
