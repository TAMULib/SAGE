package edu.tamu.sage.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.validation.constraints.NotNull;

import edu.tamu.weaver.data.model.BaseEntity;

@Entity
public class OutputMapping extends BaseEntity {

    @NotNull
    @Column(nullable = false)
    private String inputField;

    @ElementCollection(fetch = FetchType.EAGER)
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
