package edu.tamu.sage.model.validation;

import edu.tamu.weaver.validation.model.InputValidationType;
import edu.tamu.weaver.validation.validators.BaseModelValidator;
import edu.tamu.weaver.validation.validators.InputValidator;

public class SolrReaderValidator extends BaseModelValidator {
    
    public SolrReaderValidator() {
        String nameProperty = "name";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A Solr Reader requires a name", nameProperty, true));
        
        String solrCoreProperty = "solrCore";
        this.addInputValidator(new InputValidator(InputValidationType.required, "A Solr Reader requires a SolrCore", solrCoreProperty, true));
    }
    
}
