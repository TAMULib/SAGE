package edu.tamu.sage.model;

import static javax.persistence.FetchType.EAGER;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import edu.tamu.sage.model.validation.JobValidator;
import edu.tamu.weaver.validation.model.ValidatingBaseEntity;

@Entity
public class Job extends ValidatingBaseEntity {

    @ManyToMany(fetch = EAGER)
    @Fetch(FetchMode.SELECT)
    private List<Reader> readers;

    @ManyToMany(fetch = EAGER)
    @Fetch(FetchMode.SELECT)
    private List<Writer> writers;

    @Column(nullable = false)
    private String name;

    public Job() {
        setModelValidator(new JobValidator());

        readers = new ArrayList<Reader>();
        writers = new ArrayList<Writer>();
        name = "";
    }

    public Job(String name) {
        this.name = name;
    }

    public List<Reader> getReaders() {
        return readers;
    }

    public void setReaders(List<Reader> readers) {
        this.readers.clear();
        this.readers.addAll(readers);

    }

    public void addReader(Reader reader) {
        if (!readers.contains(reader)) {
            readers.add(reader);
        }
    }

    public void removeReader(Reader reader) {
        readers.remove(reader);
    }

    public List<Writer> getWriters() {
        return writers;
    }

    public void setWriters(List<Writer> writers) {
        this.writers.clear();
        this.writers.addAll(writers);
    }

    public void addWriter(Writer writer) {
        if (!writers.contains(writer)) {
            writers.add(writer);
        }
    }

    public void removeWriter(Writer writer) {
        writers.remove(writer);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
