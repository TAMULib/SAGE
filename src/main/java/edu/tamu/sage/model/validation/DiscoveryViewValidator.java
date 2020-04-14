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

        String slugProperty = "slug";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A Discovery View requires a slug", slugProperty, true));

        String primaryKeyProperty = "titleKey";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A Discovery View requires a Title Key", primaryKeyProperty, true));

        String descriptionProperty = "description";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A Discovery View requires a Description", descriptionProperty, true));
        this.addInputValidator(new InputValidator(InputValidationType.minlength, "A Discovery View Description must be at least 3 characters long", descriptionProperty, 3));
        this.addInputValidator(new InputValidator(InputValidationType.maxlength, "A Discovery View Description can not be more than 1000 characters long", descriptionProperty, 1000));

    }
}
