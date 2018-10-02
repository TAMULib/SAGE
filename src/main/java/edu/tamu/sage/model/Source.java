package edu.tamu.sage.model;

import javax.persistence.Column;
import javax.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import edu.tamu.sage.model.validation.SourceValidator;
import edu.tamu.weaver.validation.model.ValidatingBaseEntity;

@Entity
public class Source extends ValidatingBaseEntity implements Sourcable {
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

    public Source() {
        setModelValidator(new SourceValidator());
    }

    public Source(String name, String uri, String username, String password) {
        this();
        setName(name);
        setUri(uri);
        setUsername(username);
        setPassword(password);
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String getUri() {
        return uri;
    }

    @Override
    public void setUri(String uri) {
        this.uri = uri;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public void setPassword(String password) {
        this.password = password;
    }
}
