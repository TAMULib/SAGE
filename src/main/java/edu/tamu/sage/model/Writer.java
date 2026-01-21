package edu.tamu.sage.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import edu.tamu.sage.model.validation.WriterValidator;
import edu.tamu.weaver.validation.model.ValidatingBaseEntity;

@Entity
public class Writer extends ValidatingBaseEntity implements Writable {
    @NotNull
    @Column(unique = true, nullable = false)
    private String name;

    @ManyToOne
    private Source source;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @Fetch(FetchMode.SELECT)
    private List<OutputMapping> outputMappings;

    public Writer() {
        setModelValidator(new WriterValidator());
        outputMappings = new ArrayList<OutputMapping>();
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
    public Source getSource() {
        return source;
    }

    @Override
    public void setSource(Source source) {
        this.source = source;

    }

    @Override
    public List<OutputMapping> getOutputMappings() {
        return outputMappings;
    }

    @Override
    public void setOutputMappings(List<OutputMapping> outputMappings) {
        this.outputMappings = outputMappings;
    }

}
