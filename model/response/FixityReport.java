package edu.tamu.cap.model.response;

import java.io.Serializable;
import java.util.List;

public class FixityReport implements Serializable {

	private static final long serialVersionUID = 2796084431207624730L;
	
	private static final String PRIMIS_HAS_EVENT_OUTCOME_PREDICATE = "http://www.loc.gov/premis/rdf/v1#hasEventOutcome";
	private static final String PRIMIS_HAS_MESSAGE_DIGEST_PREDICATE = "http://www.loc.gov/premis/rdf/v1#hasMessageDigest";
	private static final String PRIMIS_HAS_SIZE_PREDICATE = "http://www.loc.gov/premis/rdf/v1#hasSize";
	
	private String status;
	
	private String messageDigest;
	
	private String size;
	
	public FixityReport() {}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMessageDigest() {
		return messageDigest;
	}

	public void setMessageDigest(String messageDigest) {
		this.messageDigest = messageDigest;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public static FixityReport of(List<Triple> properties) {
		
		FixityReport fixityReport = new FixityReport();
		
		properties.forEach(triple->{
			
			switch(triple.getPredicate()) {
				case PRIMIS_HAS_EVENT_OUTCOME_PREDICATE:
					fixityReport.setStatus(triple.getObject());			
					break;
				case PRIMIS_HAS_MESSAGE_DIGEST_PREDICATE:
					fixityReport.setMessageDigest(triple.getObject());			
					break;
				case PRIMIS_HAS_SIZE_PREDICATE:
					fixityReport.setSize(triple.getObject());			
					break;
			}
						
		});
		
		return fixityReport;
	}
	

}
