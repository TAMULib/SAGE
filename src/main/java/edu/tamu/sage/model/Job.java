package edu.tamu.sage.model;

import static javax.persistence.FetchType.EAGER;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.OrderColumn;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import edu.tamu.sage.model.validation.JobValidator;
import edu.tamu.weaver.validation.model.ValidatingBaseEntity;

@Entity
public class Job extends ValidatingBaseEntity {

    @NotNull
    @Column(nullable = false, unique = true)
    private String name;

    @NotNull
    @ManyToMany(fetch = EAGER)
    @Fetch(FetchMode.SELECT)
    @Column(nullable = false)
    private List<Reader> readers;

    @OrderColumn
    @ManyToMany(fetch = EAGER)
    @Fetch(FetchMode.SELECT)
    private List<BaseOp> operators;

    @ManyToMany(fetch = EAGER)
    @Fetch(FetchMode.SELECT)
    @Column(nullable = false)
    private List<Writer> writers;

    @Embedded
    private Schedule schedule;

    public Job() {
        setModelValidator(new JobValidator());
        setReaders(new ArrayList<Reader>());
        setOperators(new ArrayList<BaseOp>());
        setWriters(new ArrayList<Writer>());
    }

    public Job(String name) {
        this();
        setName(name);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Reader> getReaders() {
        return readers;
    }

    public void setReaders(List<Reader> readers) {
        this.readers = readers;
    }

    public List<BaseOp> getOperators() {
        return operators;
    }

    public void setOperators(List<BaseOp> operators) {
        this.operators = operators;
    }

    public List<Writer> getWriters() {
        return writers;
    }

    public void setWriters(List<Writer> writers) {
        this.writers = writers;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }
}
