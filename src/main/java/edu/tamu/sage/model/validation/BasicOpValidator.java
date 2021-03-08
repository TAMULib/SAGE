package edu.tamu.sage.model.validation;

import edu.tamu.weaver.validation.model.InputValidationType;
import edu.tamu.weaver.validation.validators.InputValidator;

public class BasicOpValidator extends BaseOpValidator {

    public BasicOpValidator() {
        super();

        String fieldProperty = "field";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A operator requires a field", fieldProperty, true));
        this.addInputValidator(new InputValidator(InputValidationType.minlength, "A operator field must be at least 2 characters", fieldProperty, 2));
        this.addInputValidator(new InputValidator(InputValidationType.maxlength, "A operator field must be no more than 80 characters", fieldProperty, 80));
    }

}
