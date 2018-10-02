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

import edu.tamu.sage.model.validation.ReaderValidator;
import edu.tamu.weaver.validation.model.ValidatingBaseEntity;

@Entity
public class Reader extends ValidatingBaseEntity implements Readable {

    @Column(unique = true)
    private String name;

    @ManyToOne
    private Source source;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @Fetch(FetchMode.SELECT)
    List<Field> fields;

    @Column
    private String sortTitle;

    @Column
    private String sortId;

    @Column
    private String filter;

    public Reader() {
        setModelValidator(new ReaderValidator());
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
    public List<Field> getFields() {
        return fields;
    }

    @Override
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

    @Override
    public String getSortTitle() {
        return sortTitle;
    }

    public void setSortTitle(String sortTitle) {
        this.sortTitle = sortTitle;
    }

    @Override
    public String getSortId() {
        return sortId;
    }

    public void setSortId(String sortId) {
        this.sortId = sortId;
    }

    public String getFilter() {
        return filter;
    }

    public void setFilter(String filter) {
        this.filter = filter;
    }
}
