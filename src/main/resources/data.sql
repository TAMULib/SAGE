-- Creat default internal metadata.

INSERT INTO INTERNAL_METADATA 
  (gloss, field, required) 
VALUES 
  ('id', 'Id', true),
  ('collection', 'Collection', true),
  ('thumbnail', 'Thumbnail', false),
  ('resource', 'Resource', false),
  ('manifest', 'IIIF Manifest', false),
  ('applicationType', 'Application Type', false),

  ('title', 'Title (dc.title, dcterms.title)', true),
  ('contentType', 'Content Type (dc.type)', false),
  ('digitalPublisher', 'Digital Publisher (dc.publisher, dcterms.publisher)', false),
  ('rightsAccess', 'Rights/Access (dc.rights, dcterms.terms)', false),
  ('reformatting', 'Reformatting (dc.format, dcterms.formats)', false),
  ('filename', 'Filename (dc.identifier, ebucore.filename)', false),
  
  ('subject', 'Subject (dc.subject, dcterms.subject)', false),
  ('creator', 'Creator (dc.creator, dcterms.creator)', false),
  ('datePublished', 'Date Published (dcterms.dateAccepted)', false),
  ('dateCreated', 'Date Created (dc.date, dcterms.date, dcterms.created)', false),
  ('summaryAbstract', 'Summary/Abstract (dc.description, dcterms.abstract)', false),
  ('language', 'Language (dc.language, dcterms.language)', false),
  ('institutionDepartment', 'Institution/Department (dc.contributor, dc.description)', false),
  ('standardDigitalIdentifier', 'Standard Digital Identifier (dc.identifier)', false),
  ('localDigitalIdentifier', 'Local Digital Identifier (dc.identifier)', false),
  ('editionRevisionInformation', 'Edition/Revision Information (dc.description, dcterms.hasVersion)', false),
  
  ('alternativeTitle', 'Alternative Title (dcterms.alternative)', false),
  ('genre', 'Genre (dc.type)', false),
  ('tableOfContents', 'Table of Contents (dcterms.tableOfContents)', false),
  ('contributor', 'Contributor (dc.contributor, dcterms.contributor)', false),
  ('relatedResource', 'Related Resource (dcterms.isPartOf)', false),
  ('originalPublisher', 'Original Publisher (dc.publisher)', false),
  ('physicalExtent', 'Physical Extent (dcterms.extent)', false),
  ('sponsor', 'Sponsor (dc.contributor, dc.description)', false),
  
  ('sourceCollection', 'Source Collection (dc.relation, dcterms.relation)', false),
  ('originalResource', 'Original Resource (dc.source, dcterms.source)', false),
  ('notes', 'Notes (dc.description, dc.provenance)', false),
  ('origin', 'Original Place of Publication, Production or Manufacture (dc.description)', false),
  ('audience', 'Audience Level (dc.audience, dcterms.audience)', false),
  ('classification', 'Classification (dc.description)', false),
  ('itemIdentifier', 'Physical Item Identifier (dc.identifier)', false),
  ('itemLocation', 'Physical Item Location (dc.description)', false),
  ('details', 'Details (local.details)', false),
  ('spatial', 'Spatial (dcterms.spatial)', false),
  ('preferredPlayer', 'Preferred Player', false);
