package edu.tamu.sage.model.validation;

import edu.tamu.weaver.validation.model.InputValidationType;
import edu.tamu.weaver.validation.validators.BaseModelValidator;
import edu.tamu.weaver.validation.validators.InputValidator;

public class SolrWriterValidator extends BaseModelValidator {
    public SolrWriterValidator() {    
        String nameProperty = "name";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A Solr Writer requires a name", nameProperty, true));
        
        String mappingProperty = "outputMappings";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A Solr Writer requires Output Mappings", mappingProperty, true));

        String solrCoreProperty = "solrCore";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A Solr Writer requires a SolrCore", solrCoreProperty, true));
    }
}
