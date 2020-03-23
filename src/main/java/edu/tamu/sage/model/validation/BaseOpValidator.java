package edu.tamu.sage.model.validation;

import edu.tamu.weaver.validation.model.InputValidationType;
import edu.tamu.weaver.validation.validators.BaseModelValidator;
import edu.tamu.weaver.validation.validators.InputValidator;

public class BaseOpValidator extends BaseModelValidator {

    public BaseOpValidator() {
        String typeProperty = "type";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A operator requires a type", typeProperty, true));

        String nameProperty = "name";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A operator requires a name", nameProperty, true));
        this.addInputValidator(new InputValidator(InputValidationType.minlength, "A operator name must be at least 2 characters", nameProperty, 2));
        this.addInputValidator(new InputValidator(InputValidationType.maxlength, "A operator name must be no more than 80 characters", nameProperty, 80));
    }

}
