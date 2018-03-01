package edu.tamu.sage.model.validation;

import edu.tamu.weaver.validation.model.InputValidationType;
import edu.tamu.weaver.validation.utility.ValidationUtility;
import edu.tamu.weaver.validation.validators.BaseModelValidator;
import edu.tamu.weaver.validation.validators.InputValidator;

public class SolrCoreValidator extends BaseModelValidator {
    
    public SolrCoreValidator() {
        String typeProperty = "name";
        this.addInputValidator(new InputValidator(InputValidationType.required, "An Solr Core requires a name", typeProperty, true));
        
        String uriProperty = "uri";
        this.addInputValidator(new InputValidator(InputValidationType.required, "An Solr Core requires a URI", uriProperty, true));
        this.addInputValidator(new InputValidator(InputValidationType.pattern, "An Solr Core requires a valid URI", uriProperty, ValidationUtility.URL_REGEX));
    }
    
}
