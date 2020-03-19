package edu.tamu.sage.model.validation;

import edu.tamu.weaver.validation.model.InputValidationType;
import edu.tamu.weaver.validation.validators.InputValidator;

public class DateNormalizationOpValidator extends BaseOpValidator {

    public DateNormalizationOpValidator() {
        super();

        String fieldProperty = "field";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A date normalization operator requires a field", fieldProperty, true));
        this.addInputValidator(new InputValidator(InputValidationType.minlength, "A date normalization operator field must be at least 2 characters", fieldProperty, 2));
        this.addInputValidator(new InputValidator(InputValidationType.maxlength, "A date normalization operator field must be no more than 40 characters", fieldProperty, 40));

        String valueProperty = "value";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A date normalization operator requires a value", valueProperty, true));
        this.addInputValidator(new InputValidator(InputValidationType.minlength, "A date normalization operator value must be at least 4 characters", valueProperty, 4));

        this.addInputValidator(new InputValidator(InputValidationType.pattern, "A date normalization operator value must be a valid date format", valueProperty, "^yyyy-MM-dd'T'HH:mm:ss[\\.|,]SSS[z|Z]?$|^yyyy-MM-dd'T'HH:mm:ss[\\.|,]SSSZZ$|^yyyy-MM-dd'T'HH:mm:ss[z|Z]?$|^yyyy-MM-dd'T'HH:mm:ssZZ$|^yyyy-MM-dd'T'HH:mm[z|Z]?$|^yyyy-MM-dd'T'HH:mmZZ$|^yyyy-MM-dd HH:mm:ss[\\.|,]SSS[z|Z]?$|^yyyy-MM-dd HH:mm:ss[\\.|,]SSSZZ$|^yyyy-MM-dd HH:mm:ss[z|Z]?$|^yyyy-MM-dd HH:mm:ssZZ$|^yyyy-MM-dd HH:mm[z|Z]?$|^yyyy-MM-dd HH:mmZZ$|^yyyy-MM-dd$|^yyyy-MM$|^yyyy$|^MM/dd/yyyy$"));
    }

}
