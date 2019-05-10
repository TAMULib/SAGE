package edu.tamu.sage.model.validation;

import edu.tamu.weaver.validation.model.InputValidationType;
import edu.tamu.weaver.validation.validators.BaseModelValidator;
import edu.tamu.weaver.validation.validators.InputValidator;

public class BaseOpValidator extends BaseModelValidator {

    public BaseOpValidator() {
        String nameProperty = "name";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A basic operator requires a name", nameProperty, true));
        this.addInputValidator(new InputValidator(InputValidationType.minlength, "A basic operator name must be at least 2 characters", nameProperty, 2));
        this.addInputValidator(new InputValidator(InputValidationType.maxlength, "A basic operator name must be no more than 40 characters", nameProperty, 40));
    }

}
