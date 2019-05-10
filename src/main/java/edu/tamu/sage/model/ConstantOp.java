package edu.tamu.sage.model;

import java.util.Map;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("Constant")
public class ConstantOp extends BasicOp {

    @Override
    public void process(Map<String, String> sageDoc) {
        sageDoc.put(getField(), getValue());
    }

}
