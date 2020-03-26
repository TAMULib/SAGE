package edu.tamu.sage.model.validation;

import edu.tamu.weaver.validation.model.InputValidationType;
import edu.tamu.weaver.validation.validators.InputValidator;

public class Base64EncodeOpValidator extends BaseOpValidator {

    public Base64EncodeOpValidator() {
        super();
        String fieldProperty = "field";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A base 64 encode operator requires a field", fieldProperty, true));
        this.addInputValidator(new InputValidator(InputValidationType.minlength, "A base 64 encode operator field must be at least 2 characters", fieldProperty, 2));
        this.addInputValidator(new InputValidator(InputValidationType.maxlength, "A base 64 encode operator field must be no more than 40 characters", fieldProperty, 40));
    }

}
