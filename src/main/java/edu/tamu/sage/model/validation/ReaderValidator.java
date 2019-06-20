package edu.tamu.sage.model.validation;

import edu.tamu.weaver.validation.model.InputValidationType;
import edu.tamu.weaver.validation.validators.BaseModelValidator;
import edu.tamu.weaver.validation.validators.InputValidator;

public class ReaderValidator extends BaseModelValidator {

    public ReaderValidator() {
        String nameProperty = "name";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A Solr Reader requires a name", nameProperty, true));

        String sourceProperty = "source";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A Solr Reader requires a Source", sourceProperty, true));
    }

}
