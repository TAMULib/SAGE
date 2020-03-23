package edu.tamu.sage.model;

public interface Sourcable {

    public String getName();

    public void setName(String name);

    public String getUri();

    public void setUri(String uri);

    public String getUsername();

    public void setUsername(String username);

    public String getPassword();

    public void setPassword(String password);

    public Boolean getReadOnly();

    public void setReadOnly(Boolean readOnly);

    public Boolean getRequiresFilter();

    public void setRequiresFilter(Boolean requiresFilter);

    public ApplicationType getApplicationType();

    public void setApplicationType(ApplicationType applicationType);

}
