package edu.tamu.sage.model.validation;

import edu.tamu.weaver.validation.model.InputValidationType;
import edu.tamu.weaver.validation.validators.InputValidator;

public class BasicValueOpValidator extends BasicOpValidator {
    
    public BasicValueOpValidator() {
        super();

        String valueProperty = "value";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A operator requires a value", valueProperty, true));
        this.addInputValidator(new InputValidator(InputValidationType.minlength, "A operator value must be at least 2 characters", valueProperty, 2));
    }

}
