package edu.tamu.sage.service;

import java.util.List;

import edu.tamu.sage.exceptions.SourceFieldsException;
import edu.tamu.sage.model.response.SolrField;

public interface SourceService {

	public List<SolrField> getAvailableFields(String uri, String filter) throws SourceFieldsException;
	
	public List<SolrField> getIndexedFields(String uri, String filter) throws SourceFieldsException;

}
