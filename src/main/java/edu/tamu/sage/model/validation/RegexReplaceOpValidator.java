package edu.tamu.sage.model.validation;

import edu.tamu.weaver.validation.model.InputValidationType;
import edu.tamu.weaver.validation.validators.InputValidator;

public class RegexReplaceOpValidator extends BaseOpValidator {

    public RegexReplaceOpValidator() {
        super();

        String fieldProperty = "field";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A regex replace operator requires a field", fieldProperty, true));
        this.addInputValidator(new InputValidator(InputValidationType.minlength, "A regex replace operator field must be at least 2 characters", fieldProperty, 2));
        this.addInputValidator(new InputValidator(InputValidationType.maxlength, "A regex replace operator field must be no more than 80 characters", fieldProperty, 80));

        String valueProperty = "value";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A regex replace operator requires a value", valueProperty, true));
        this.addInputValidator(new InputValidator(InputValidationType.minlength, "A regex replace operator value must be at least 2 characters", valueProperty, 2));

        String regexProperty = "regex";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A regex replace operator requires a regex", regexProperty, true));
        this.addInputValidator(new InputValidator(InputValidationType.minlength, "A regex replace operator regex must be at least 1 characters", regexProperty, 1));
    }

}
