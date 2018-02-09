package edu.tamu.cap.model.response;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import edu.tamu.cap.service.FedoraService;

public class IRContext implements Serializable {

    private static final long serialVersionUID = -8489156248122941988L;

    private String name;

    private Triple triple;

    private Triple parent;

    private List<Triple> properties;

    private List<Triple> metadata;

    private List<IRContext> children;
    
    private List<Version> versions;
    
    private FixityReport fixity;

    private String version;

	public IRContext() {
        super();
        properties = new ArrayList<Triple>();
        metadata = new ArrayList<Triple>();
        versions = new ArrayList<Version>();
        children = new ArrayList<IRContext>();
    }

    public IRContext(Triple triple) {
        this();
        this.triple = triple;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Triple getTriple() {
        return triple;
    }

    public void setTriple(Triple triple) {
        this.triple = triple;
    }

    public Triple getParent() {
        return parent;
    }

    public void setParent(Triple parent) {
        this.parent = parent;
    }

    public boolean getHasParent() {
        return Optional.ofNullable(parent).isPresent();
    }

    public boolean isResource() {
        return triple.getObject().equals(FedoraService.FEDORA_BINRAY_PREDICATE);
    }

    public List<Triple> getProperties() {
        return properties;
    }

    public void setProperties(List<Triple> properties) {
        this.properties = properties;
    }

    public void addProperty(Triple property) {
        properties.add(property);
    }

    public List<Triple> getMetadata() {
        return metadata;
    }

    public void setMetadata(List<Triple> metadata) {
        this.metadata = metadata;
    }

    public void addMetadum(Triple metadatum) {
        metadata.add(metadatum);
    }

    public List<IRContext> getChildren() {
        return children;
    }

    public void setChildren(List<IRContext> children) {
        this.children = children;
    }

    public void addChild(IRContext child) {
        children.add(child);
    }
    
    public List<Version> getVersions() {
        return versions;
    }

    public void setVersions(List<Version> versions) {
        this.versions = versions;
    }
    
    public void addVersion(Version version) {
        this.versions.add(version);
    }
    
    public void removeVersion(Triple triple) {
        this.versions.remove(triple);
    }

    public FixityReport getFixity() {
		return fixity;
	}

	public void setFixity(FixityReport fixity) {
		this.fixity = fixity;
	}

    public void setVersion(String version) {
        this.version = version;
    }
    
    public String getVersion() {
        return version;
    }
    
    public boolean getIsVersion() {
        return Optional.ofNullable(version).isPresent();
    }

}
