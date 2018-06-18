package edu.tamu.sage.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import edu.tamu.sage.model.validation.SolrReaderValidator;
import edu.tamu.weaver.validation.model.ValidatingBaseEntity;

@Entity
public class SolrReader extends ValidatingBaseEntity implements Reader {

    @Column(unique = true)
    private String name;

    @ManyToOne
    private SolrCore solrCore;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @Fetch(FetchMode.SELECT)
    List<Field> fields;
    
    @Column
    private String sortTitle;

    @Column
    private String sortId;

    public SolrReader() {
        setModelValidator(new SolrReaderValidator());
    }    

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public SolrCore getSolrCore() {
        return solrCore;
    }

    public void setSolrCore(SolrCore solrCore) {
        this.solrCore = solrCore;
    }
    
    public List<Field> getFields() {
        return fields;
    }

    public void setFields(List<Field> fields) {
        this.fields = fields;
    }

    public void addField(Field field) {
        fields.add(field);
    }

    public void removeField(Field field) {
        fields.forEach(f->{
            if(f.getId().equals(field.getId())) {
                fields.remove(f);
            }
        });
    }

    public String getSortTitle() {
        return sortTitle;
    }

    public void setSortTitle(String sortTitle) {
        this.sortTitle = sortTitle;
    }

    public String getSortId() {
        return sortId;
    }

    public void setSortId(String sortId) {
        this.sortId = sortId;
    }
}
