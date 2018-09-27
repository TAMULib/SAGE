package edu.tamu.sage.model.validation;

import edu.tamu.weaver.validation.model.InputValidationType;
import edu.tamu.weaver.validation.validators.BaseModelValidator;
import edu.tamu.weaver.validation.validators.InputValidator;

public class JobValidator extends BaseModelValidator {

    public JobValidator() {
        String nameProperty = "name";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A Job requires a name", nameProperty, true));

        String readersProperty = "readers";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A Job requires a reader", readersProperty, true));

        String writersProperty = "writers";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A Job requires a writer", writersProperty, true));
    }
}
