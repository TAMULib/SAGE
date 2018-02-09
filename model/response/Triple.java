package edu.tamu.cap.model.response;

import java.io.Serializable;
import java.util.Map;

public class Triple implements Serializable {

    private static final long serialVersionUID = -8857131728443388752L;

    private String subject;

    private String predicate;

    private String object;

    public Triple() {
        super();
    };

    public Triple(String subject, String predicate, String object) {
        this();
        this.subject = subject;
        this.predicate = predicate;
        this.object = object;
    };

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getPredicate() {
        return predicate;
    }

    public void setPredicate(String predicate) {
        this.predicate = predicate;
    }

    public String getObject() {
        return object;
    }

    public void setObject(String object) {
        this.object = object;
    }

    public static Triple of(String subject, String predicate, String object) {
        return new Triple(subject, predicate, object);
    }
    
    public static Triple of(Map<String, String> tripleMap) {
        return new Triple(tripleMap.get("subject"), tripleMap.get("predicate"), tripleMap.get("object"));
    }
    
    public static Triple of(org.apache.jena.graph.Triple asTriple) {
        return Triple.of(asTriple.getSubject().toString(), asTriple.getPredicate().toString(), asTriple.getObject().toString());
    }
    
    @Override
    public String toString() {
        StringBuilder stngBldr = new StringBuilder();
        stngBldr.append("<").append(subject).append("> ");
        stngBldr.append("<").append(predicate).append("> ");
        if(object.contains("http://")) {
            stngBldr.append("<").append(object).append("> ");
        } else {
            stngBldr.append("'").append(object).append("' ");
        }
        return stngBldr.toString();
    }

    

}
