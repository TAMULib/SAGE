package edu.tamu.sage.model;

import javax.persistence.Column;
import javax.persistence.Entity;

import edu.tamu.sage.model.validation.IndexValidator;
import edu.tamu.weaver.validation.model.ValidatingBaseEntity;

@Entity
public class Index extends ValidatingBaseEntity {

    @Column(unique = true)
    private String name;

    @Column
    private String uri;
    
    public Index() {
        setModelValidator(new IndexValidator());
    }
    
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
