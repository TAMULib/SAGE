package edu.tamu.sage.model.validation;

import edu.tamu.weaver.validation.model.InputValidationType;
import edu.tamu.weaver.validation.utility.ValidationUtility;
import edu.tamu.weaver.validation.validators.BaseModelValidator;
import edu.tamu.weaver.validation.validators.InputValidator;

public class SourceValidator extends BaseModelValidator {

    public SourceValidator() {
        String typeProperty = "name";
        this.addInputValidator(new InputValidator(InputValidationType.required, "An Solr Source requires a name", typeProperty, true));

        String uriProperty = "uri";
        this.addInputValidator(new InputValidator(InputValidationType.required, "An Solr Source requires a URI", uriProperty, true));
        this.addInputValidator(new InputValidator(InputValidationType.pattern, "An Solr Source requires a valid URI", uriProperty, ValidationUtility.URL_REGEX));
        
        String applicationTypeProperty = "applicationType";
        this.addInputValidator(new InputValidator(InputValidationType.required, "An Solr Source requires an application type", applicationTypeProperty, true));
    }

}
