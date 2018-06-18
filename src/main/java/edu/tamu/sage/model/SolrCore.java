package edu.tamu.sage.model;

import javax.persistence.Column;
import javax.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import edu.tamu.sage.model.validation.SolrCoreValidator;
import edu.tamu.weaver.validation.model.ValidatingBaseEntity;

@Entity
public class SolrCore extends ValidatingBaseEntity implements Core {
    //TODO Query the SOLR Core for its fields to provide Readers/Writers with a list of fields to choose from for mapping to the internal metadata fields
    @Column(unique = true)
    private String name;

    @Column
    private String uri;
    
    @Column
    private String username;

    @Column
    @JsonIgnore
    private String password;
    
    public SolrCore() {
        setModelValidator(new SolrCoreValidator());
    }
    
    public SolrCore(String name, String uri, String username, String password) {
        this();
        setName(name);
        setUri(uri);
        setUsername(username);
        setPassword(password);
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
