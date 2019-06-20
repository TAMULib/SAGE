package edu.tamu.sage.model.validation;

import edu.tamu.weaver.validation.model.InputValidationType;
import edu.tamu.weaver.validation.validators.InputValidator;

public class BasicOpValidator extends BaseOpValidator {

    public BasicOpValidator() {
        super();

        String fieldProperty = "field";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A basic operator requires a field", fieldProperty, true));
        this.addInputValidator(new InputValidator(InputValidationType.minlength, "A basic operator field must be at least 2 characters", fieldProperty, 2));
        this.addInputValidator(new InputValidator(InputValidationType.maxlength, "A basic operator field must be no more than 25 characters", fieldProperty, 25));

        String valueProperty = "value";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A basic operator requires a value", valueProperty, true));
        this.addInputValidator(new InputValidator(InputValidationType.minlength, "A basic operator value must be at least 2 characters", valueProperty, 2));
        this.addInputValidator(new InputValidator(InputValidationType.maxlength, "A basic operator value must be no more than 25 characters", valueProperty, 80));
    }

}
