package edu.tamu.sage.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import edu.tamu.sage.model.validation.SolrWriterValidator;
import edu.tamu.weaver.validation.model.ValidatingBaseEntity;

@Entity
public class SolrWriter extends ValidatingBaseEntity implements Writer {
    @Column(unique=true)
    private String name;
    
    @ManyToOne
    private SolrCore solrCore;
    
    @ElementCollection
    private List<OutputMapping> outputMappings;
    
    public SolrWriter() {
        setModelValidator(new SolrWriterValidator());
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

    public List<OutputMapping> getOutputMapping() {
        return outputMappings;
    }
    
    public void setOutputMapping(List<OutputMapping> outputMappings) {
        this.outputMappings = outputMappings;
    }
    
}
