package edu.tamu.sage.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import edu.tamu.sage.model.validation.SourceValidator;
import edu.tamu.weaver.validation.model.ValidatingBaseEntity;

// In the UI, this is called a "Core" and not a "Source", the "readOnly" property instead designates this as a "Source" or "Destination".
@Entity
public class Source extends ValidatingBaseEntity implements Sourcable {
    // TODO Query the SOLR Core for its fields to provide Readers/Writers with a list of fields to choose from for mapping to the internal metadata fields
    @NotNull
    @Column(unique = true, nullable = false)
    private String name;

    @NotNull
    @Column(nullable = false)
    private String uri;

    @NotNull
    @Column(nullable = false)
    private String username;

    // @JsonIgnore prevents @NotNull and nullable = false from being used here.
    @Column
    @JsonIgnore
    private String password;

    // In the UI, this is used as the "Type", such that TRUE is "Source", and FALSE is "Destination".
    @NotNull
    @Column(nullable = false)
    private Boolean readOnly;

    @NotNull
    @Column(nullable = false)
    private Boolean requiresFilter;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationType applicationType;

    public Source() {
        setModelValidator(new SourceValidator());
        setApplicationType(ApplicationType.UNSPECIFIED);
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
    public String getUri() {
        return uri;
    }

    @Override
    public void setUri(String uri) {
        this.uri = uri;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public Boolean getReadOnly() {
        return readOnly;
    }

    @Override
    public void setReadOnly(Boolean readOnly) {
        this.readOnly = readOnly;
    }

    @Override
    public Boolean getRequiresFilter() {
        return requiresFilter;
    }

    @Override
    public void setRequiresFilter(Boolean requiresFilter) {
        this.requiresFilter = requiresFilter;
    }

    @Override
    public ApplicationType getApplicationType() {
        return applicationType;
    }

    @Override
    public void setApplicationType(ApplicationType applicationType) {
        this.applicationType = applicationType;
    }

}
