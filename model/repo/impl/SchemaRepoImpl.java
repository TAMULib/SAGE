package edu.tamu.cap.model.repo.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.jena.ontology.OntModel;
import org.apache.jena.ontology.OntProperty;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.util.iterator.ExtendedIterator;

import edu.tamu.cap.exceptions.OntModelReadException;
import edu.tamu.cap.model.Property;
import edu.tamu.cap.model.Schema;
import edu.tamu.cap.model.repo.SchemaRepo;
import edu.tamu.cap.model.repo.custom.SchemaRepoCustom;
import edu.tamu.weaver.data.model.repo.impl.AbstractWeaverRepoImpl;

public class SchemaRepoImpl extends AbstractWeaverRepoImpl<Schema, SchemaRepo> implements SchemaRepoCustom {
	
	@Override
	public List<Property> findPropertiesByNamespace(String namespace) throws OntModelReadException {
		
		List<Property> properties = new ArrayList<Property>();
				
		OntModel ontModel = ModelFactory.createOntologyModel();
		
		try {
			ontModel.read(namespace);
			
			ExtendedIterator<OntProperty> propertiesIterator = ontModel.listAllOntProperties();
			
			propertiesIterator.forEachRemaining(property->{
				Optional<String> label = Optional.ofNullable(property.asProperty().getLabel(null));
				Optional<String> uri = Optional.ofNullable(property.asProperty().getURI());
				if(label.isPresent() && uri.isPresent()) {
					Property prop = new Property();
					prop.setLabel(label.get());
					prop.setUri(uri.get());
					properties.add(prop);
				}
			});
			
		} catch (Exception e) {
			throw new OntModelReadException(e.getMessage());
		}
		
		
		return properties;
	}
	
	@Override
	protected String getChannel() {
		return "/channel/schema";
	}

	
}