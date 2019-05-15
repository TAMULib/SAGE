package edu.tamu.sage.model.validation;

import edu.tamu.weaver.validation.model.InputValidationType;
import edu.tamu.weaver.validation.validators.BaseModelValidator;
import edu.tamu.weaver.validation.validators.InputValidator;

public class InternalMetadataValidator extends BaseModelValidator {

    public InternalMetadataValidator() {
        String glossProperty = "gloss";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A internal metadatum requires a gloss", glossProperty, true));
        this.addInputValidator(new InputValidator(InputValidationType.minlength, "A internal metadatum gloss must be at least 2 characters", glossProperty, 2));
        this.addInputValidator(new InputValidator(InputValidationType.maxlength, "A internal metadatum gloss must be no more than 40 characters", glossProperty, 40));

        String fieldProperty = "field";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A internal metadatum requires a field", fieldProperty, true));
        this.addInputValidator(new InputValidator(InputValidationType.minlength, "A internal metadatum field must be at least 2 characters", fieldProperty, 2));
        this.addInputValidator(new InputValidator(InputValidationType.maxlength, "A internal metadatum field must be no more than 25 characters", fieldProperty, 25));

        String requiredProperty = "required";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A internal metadatum requires a required flag", requiredProperty, true));
    }

}
