package edu.tamu.cap.model.validation;

import edu.tamu.weaver.validation.model.InputValidationType;
import edu.tamu.weaver.validation.utility.ValidationUtility;
import edu.tamu.weaver.validation.validators.BaseModelValidator;
import edu.tamu.weaver.validation.validators.InputValidator;

public class SchemaValidator extends BaseModelValidator {

    public SchemaValidator() {
    	
    	String nameProperty = "name";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A schema requires a name", nameProperty, true));
        this.addInputValidator(new InputValidator(InputValidationType.minlength, "Names must be at least 2 charachters long.", nameProperty, 2));
        
        String abbreviationProperty = "abbreviation";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A schema requires an abbreviation", abbreviationProperty, true));
        this.addInputValidator(new InputValidator(InputValidationType.maxlength, "Abbreviations must be at most 8 charachters long.", abbreviationProperty, 8));
        this.addInputValidator(new InputValidator(InputValidationType.minlength, "Abbreviations must be at least 2 charachters long.", abbreviationProperty, 2));

        String namespace = "namespace";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A schema requires a URI", namespace, true));
        this.addInputValidator(new InputValidator(InputValidationType.pattern, "A schema requires a valid URI", namespace, ValidationUtility.URL_REGEX));
        
    }
}
