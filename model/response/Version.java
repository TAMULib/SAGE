package edu.tamu.cap.model.response;

import java.io.Serializable;

public class Version  implements Serializable {
    
    String name;
    
    String time;
    
    Triple triple;

    private static final long serialVersionUID = 6125496651739394381L;

    public Version() {
        super();
    }
    
    public Version(String name, String time, Triple triple) {
        super();
        setName(name);
        setTime(time);
        setTriple(triple);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Triple getTriple() {
        return triple;
    }

    public void setTriple(Triple triple) {
        this.triple = triple;
    }

    public static Version of(Triple t) {
        Version v = new Version();
        v.setTriple(t);
        return v;
    }
    
}
