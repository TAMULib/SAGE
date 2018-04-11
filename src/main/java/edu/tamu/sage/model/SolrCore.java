package edu.tamu.sage.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.fasterxml.jackson.annotation.JsonIgnore;

import edu.tamu.sage.model.validation.SolrCoreValidator;
import edu.tamu.weaver.validation.model.ValidatingBaseEntity;

@Entity
public class SolrCore extends ValidatingBaseEntity implements Core {

    @Column(unique = true)
    private String name;

    @Column
    private String uri;
    
    @Column
    private String username;

    @Column
    @JsonIgnore
    private String password;
    
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @Fetch(FetchMode.SELECT)
    List<Field> fields;
    
    public SolrCore() {
        setModelValidator(new SolrCoreValidator());
    }
    
    public SolrCore(String name, String uri, String username, String password, List<Field> fields) {
        this();
        setName(name);
        setUri(uri);
        setUsername(username);
        setPassword(password);
        setFields(fields);
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

    public List<Field> getFields() {
        return fields;
    }

    public void setFields(List<Field> fields) {
        this.fields = fields;
    }

    @Override
    public void addField(Field field) {
        fields.add(field);
    }

    @Override
    public void removeField(Field field) {
        fields.forEach(f->{
            if(f.getId().equals(field.getId())) {
                fields.remove(f);
            }
        });
    }

}
