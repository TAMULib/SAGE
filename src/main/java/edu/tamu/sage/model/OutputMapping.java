package edu.tamu.sage.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;

import edu.tamu.weaver.data.model.BaseEntity;

@Entity
public class OutputMapping extends BaseEntity {

    @Column
    private String inputField;
    
    @ElementCollection
    private List<String> mappings;
    
    public String getInputField() {
        return inputField;
    }
    
    public void setInputField(String inputField) {
        this.inputField = inputField;
    }

    public List<String> getMappings() {
        return mappings;
    }

    public void setMappings(List<String> mappings) {
        this.mappings = mappings;
    }
    

}
