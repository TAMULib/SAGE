INSERT INTO INTERNAL_METADATA SELECT * FROM (
  SELECT 1, 'id', 'Id', true UNION
  SELECT 2, 'collection', 'Collection', true UNION
  SELECT 3, 'thumbnail', 'Thumbnail', false UNION
  SELECT 4, 'resource', 'Resource', false UNION
  SELECT 5, 'manifest', 'IIIF Manifest', false UNION
  
  SELECT 6, 'title', 'Title (dc.title, dcterms.title)', true UNION
  SELECT 7, 'contentType', 'Content Type (dc.type)', false UNION
  SELECT 8, 'digitalPublisher', 'Digital Publisher (dc.publisher, dcterms.publisher)', false UNION
  SELECT 9, 'rightsAccess', 'Rights/Access (dc.rights, dcterms.terms)', false UNION
  SELECT 10, 'reformatting', 'Reformatting (dc.format, dcterms.formats)', false UNION
  SELECT 11, 'filename', 'Filename (dc.identifier, ebucore.filename)', false UNION
  
  SELECT 12, 'subject', 'Subject (dc.subject, dcterms.subject)', false UNION
  SELECT 13, 'creator', 'Creator (dc.creator, dcterms.creator)', false UNION
  SELECT 14, 'datePublished', 'Date Published (dcterms.dateAccepted)', false UNION
  SELECT 15, 'dateCreated', 'Date Created (dc.date, dcterms.date)', false UNION
  SELECT 16, 'summaryAbstract', 'Summary/Abstract (dc.description, dcterms.abstract)', false UNION
  SELECT 17, 'language', 'Language (dc.language, dcterms.language)', false UNION
  SELECT 18, 'institutionDepartment', 'Institution/Department (dc.contributor, dc.description)', false UNION
  SELECT 19, 'standardDigitalIdentifier', 'Standard Digital Identifier (dc.identifier)', false UNION
  SELECT 20, 'localDigitalIdentifier', 'Local Digital Identifier (dc.identifier)', false UNION
  SELECT 21, 'editionRevisionInformation', 'Edition/Revision Information (dc.description, dcterms.hasVersion)', false UNION
  
  SELECT 22, 'alternativeTitle', 'Alternative Title (dcterms.alternative)', false UNION
  SELECT 23, 'genre', 'Genre (dc.type)', false UNION
  SELECT 24, 'tableOfContents', 'Table of Contents (dcterms.tableOfContents)', false UNION
  SELECT 25, 'contributor', 'Contributor (dc.contributor, dcterms.contributor)', false UNION
  SELECT 26, 'relatedResource', 'Related Resource (dcterms.isPartOf)', false UNION
  SELECT 27, 'originalPublisher', 'Original Publisher (dc.publisher)', false UNION
  SELECT 28, 'physicalExtent', 'Physical Extent (dcterms.extent)', false UNION
  SELECT 29, 'sponsor', 'Sponsor (dc.contributor, dc.description)', false UNION
  
  SELECT 30, 'sourceCollection', 'Source Collection (dc.relation, dcterms.relation)', false UNION
  SELECT 31, 'originalResource', 'Original Resource (dc.source, dcterms.source)', false UNION
  SELECT 32, 'notes', 'Notes (dc.description, dc.provenance)', false UNION
  SELECT 33, 'origin', 'Original Place of Publication, Production or Manufacture (dc.description)', false UNION
  SELECT 34, 'audience', 'Audience Level (dc.audience, dcterms.audience)', false UNION
  SELECT 35, 'classification', 'Classification (dc.description)', false UNION
  SELECT 36, 'itemIdentifier', 'Physical Item Identifier (dc.identifier)', false UNION
  SELECT 37, 'itemLocation', 'Physical Item Location (dc.description)', false
) M WHERE NOT EXISTS(SELECT * FROM INTERNAL_METADATA);