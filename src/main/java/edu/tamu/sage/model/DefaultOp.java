package edu.tamu.sage.model;

import java.util.Map;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("Default")
public class DefaultOp extends BasicOp {

    @Override
    public void process(Map<String, String> sageDoc) {
        if (!sageDoc.containsKey(getField())) {
            sageDoc.put(getField(), getValue());
        }
    }

}
