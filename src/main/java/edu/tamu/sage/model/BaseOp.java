package edu.tamu.sage.model;

import static javax.persistence.InheritanceType.SINGLE_TABLE;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.Table;

import edu.tamu.sage.model.validation.BaseOpValidator;
import edu.tamu.weaver.validation.model.ValidatingBaseEntity;

@Entity
@Table(name = "OPERATOR")
@DiscriminatorColumn(name = "TYPE")
@Inheritance(strategy = SINGLE_TABLE)
public abstract class BaseOp extends ValidatingBaseEntity implements Operator {

    @Column(nullable = false)
    private String name;

    public BaseOp() {
        super();
        setModelValidator(new BaseOpValidator());
    }

    public BaseOp(String name) {
        this();
        setName(name);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
