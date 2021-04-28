package edu.tamu.sage.model;

import static com.fasterxml.jackson.annotation.JsonTypeInfo.As.EXISTING_PROPERTY;
import static com.fasterxml.jackson.annotation.JsonTypeInfo.Id.NAME;
import static javax.persistence.InheritanceType.SINGLE_TABLE;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import edu.tamu.sage.model.validation.BaseOpValidator;
import edu.tamu.weaver.validation.model.ValidatingBaseEntity;

@Entity
@Table(name = "OPERATOR")
@DiscriminatorColumn(name = "TYPE")
@Inheritance(strategy = SINGLE_TABLE)
@JsonTypeInfo(use = NAME, include = EXISTING_PROPERTY, property = "type")
@JsonSubTypes({
    @Type(value = DefaultOp.class, name = DefaultOp.TYPE),
    @Type(value = ConstantOp.class, name = ConstantOp.TYPE),
    @Type(value = ApplicationTypeOp.class, name = ApplicationTypeOp.TYPE),
    @Type(value = Base64EncodeOp.class, name = Base64EncodeOp.TYPE),
    @Type(value = DateNormalizationOp.class, name = DateNormalizationOp.TYPE),
    @Type(value = RegexReplaceOp.class, name = RegexReplaceOp.TYPE),
    @Type(value = TemplateOp.class, name = TemplateOp.TYPE),
    @Type(value = MappingOp.class, name = MappingOp.TYPE)
})
public abstract class BaseOp extends ValidatingBaseEntity implements Operator {

    @Transient
    private String type;

    @NotNull
    @Column(nullable = false, unique = true)
    private String name;

    public BaseOp() {
        super();
        setModelValidator(new BaseOpValidator());
    }

    public BaseOp(String name) {
        this();
        setName(name);
    }

    public abstract String getType();

    public void setType(String type) {
        this.type = type;
    };

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}