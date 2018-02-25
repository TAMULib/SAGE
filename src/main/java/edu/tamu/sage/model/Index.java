package edu.tamu.sage.model;

import javax.persistence.Column;

import edu.tamu.weaver.validation.model.ValidatingBaseEntity;

public class Index extends ValidatingBaseEntity {

    @Column(unique = true)
    private String name;

    @Column
    private String uri;
    
    public Index() {}
    
    public Index(String name, String uri) {
        this();
        setName(name);
        setUri(uri);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

}
