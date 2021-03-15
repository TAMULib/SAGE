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

        String infoLinkTextProperty = "infoLinkText";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A Discovery View requires Info Link Text", infoLinkTextProperty, true));

        String infoLinkUrlProperty = "infoLinkUrl";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A Discovery View requires an Info Link URL", infoLinkUrlProperty, true));

        String infoTextProperty = "infoText";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A Discovery View requires Info Text", infoTextProperty, true));

        String primaryKeyProperty = "titleKey";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A Discovery View requires a Title Key", primaryKeyProperty, true));
    }
}
