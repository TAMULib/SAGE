package edu.tamu.cap.model.validation;

import edu.tamu.weaver.validation.model.InputValidationType;
import edu.tamu.weaver.validation.utility.ValidationUtility;
import edu.tamu.weaver.validation.validators.BaseModelValidator;
import edu.tamu.weaver.validation.validators.InputValidator;

public class IRValidator extends BaseModelValidator {

    public IRValidator() {
    	String typeProperty = "type";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A repository requires a type", typeProperty, true));
    	
    	String nameProperty = "name";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A repository requires a name", nameProperty, true));

        String rootUriProperty = "rootUri";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A repository requires a URI", rootUriProperty, true));
        this.addInputValidator(new InputValidator(InputValidationType.pattern, "A repository requires a valid URI", rootUriProperty, ValidationUtility.URL_REGEX));
        
        String usernameProperty = "username";
        int usernameMin = 2;
        this.addInputValidator(new InputValidator(InputValidationType.minlength, "A repository's username must be at least " + usernameMin + " long", usernameProperty, usernameMin));
        int usernameMax = 255;
        this.addInputValidator(new InputValidator(InputValidationType.maxlength, "A repository's username must be at most " + usernameMax + " long", usernameProperty, usernameMax));
        
        String passwordProperty = "password";
        int passwordMin = 2;
        this.addInputValidator(new InputValidator(InputValidationType.minlength, "A repository password must be at least " + passwordMin + " long", passwordProperty, passwordMin));
        int passwordMax = 255;
        this.addInputValidator(new InputValidator(InputValidationType.maxlength, "A repository password must be at most " + passwordMax + " long", passwordProperty, passwordMax));
        
    }
}
