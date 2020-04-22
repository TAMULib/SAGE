package edu.tamu.sage.model;

public enum ApplicationType {
    UNSPECIFIED("unspecified"), FEDORA("fedora"), DSPACE("dspace");

    private String name;

    ApplicationType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

}
