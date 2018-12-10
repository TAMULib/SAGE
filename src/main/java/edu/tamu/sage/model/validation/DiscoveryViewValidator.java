package edu.tamu.sage.model.validation;

import edu.tamu.weaver.validation.model.InputValidationType;
import edu.tamu.weaver.validation.validators.BaseModelValidator;
import edu.tamu.weaver.validation.validators.InputValidator;

public class DiscoveryViewValidator extends BaseModelValidator {
    public DiscoveryViewValidator() {
        String nameProperty = "name";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A Discovery View requires a name", nameProperty, true));
        
        String sourceProperty = "source";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A Discovery View requires a source", sourceProperty, true));
        
        String filterProperty = "filter";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A Discovery View requires a filter", filterProperty, true));
        
        String slugProperty = "slug";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A Discovery View requires a slug", slugProperty, true));
        
        String primaryKeyProperty = "primaryKey";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A Discovery View requires a Primary Key", primaryKeyProperty, true));
        
        String primaryURIKeyProperty = "primaryURIKey";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A Discovery View requires a Primary URI Key", primaryURIKeyProperty, true));
        
    }
}
