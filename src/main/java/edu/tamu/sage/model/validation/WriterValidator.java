package edu.tamu.sage.model.validation;

import edu.tamu.weaver.validation.model.InputValidationType;
import edu.tamu.weaver.validation.validators.BaseModelValidator;
import edu.tamu.weaver.validation.validators.InputValidator;

public class WriterValidator extends BaseModelValidator {
    public WriterValidator() {
        String nameProperty = "name";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A Solr Writer requires a name", nameProperty, true));

        String mappingProperty = "outputMappings";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A Solr Writer requires Output Mappings", mappingProperty, true));

        String sourceProperty = "source";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A Solr Writer requires a Source", sourceProperty, true));
    }
}
