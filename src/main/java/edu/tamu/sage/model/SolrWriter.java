package edu.tamu.sage.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import edu.tamu.sage.model.validation.SolrWriterValidator;
import edu.tamu.weaver.validation.model.ValidatingBaseEntity;

@Entity
public class SolrWriter extends ValidatingBaseEntity implements Writer {
    @Column(unique=true)
    private String name;
    
    @ManyToOne
    private SolrCore solrCore;
    
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @Fetch(FetchMode.SELECT)
    private List<OutputMapping> outputMappings;
    
    public SolrWriter() {
        setModelValidator(new SolrWriterValidator());
        this.outputMappings = new ArrayList<OutputMapping>();
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
    public SolrCore getSolrCore() {
        return solrCore;
    }
    @Override
    public void setSolrCore(SolrCore solrCore) {
        this.solrCore = solrCore;
        
    }    

    public List<OutputMapping> getOutputMappings() {
        return outputMappings;
    }
    
    public void setOutputMappings(List<OutputMapping> outputMappings) {
        this.outputMappings = outputMappings;
    }
    
}
