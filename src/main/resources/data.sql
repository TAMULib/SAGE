INSERT INTO INTERNAL_METADATA SELECT * FROM (
  SELECT 1, 'id', 'Id', true UNION
  SELECT 2, 'collection', 'Collection', true UNION
  SELECT 3, 'thumbnail', 'Thumbnail', false UNION
  SELECT 4, 'resource', 'Resource', false UNION
  SELECT 5, 'manifest', 'IIIF Manifest', false UNION
  SELECT 6, 'applicationType', 'Application Type', false UNION

  SELECT 7, 'title', 'Title (dc.title, dcterms.title)', true UNION
  SELECT 8, 'contentType', 'Content Type (dc.type)', false UNION
  SELECT 9, 'digitalPublisher', 'Digital Publisher (dc.publisher, dcterms.publisher)', false UNION
  SELECT 10, 'rightsAccess', 'Rights/Access (dc.rights, dcterms.terms)', false UNION
  SELECT 11, 'reformatting', 'Reformatting (dc.format, dcterms.formats)', false UNION
  SELECT 12, 'filename', 'Filename (dc.identifier, ebucore.filename)', false UNION
  
  SELECT 13, 'subject', 'Subject (dc.subject, dcterms.subject)', false UNION
  SELECT 14, 'creator', 'Creator (dc.creator, dcterms.creator)', false UNION
  SELECT 15, 'datePublished', 'Date Published (dcterms.dateAccepted)', false UNION
  SELECT 16, 'dateCreated', 'Date Created (dc.date, dcterms.date, dcterms.created)', false UNION
  SELECT 17, 'summaryAbstract', 'Summary/Abstract (dc.description, dcterms.abstract)', false UNION
  SELECT 18, 'language', 'Language (dc.language, dcterms.language)', false UNION
  SELECT 19, 'institutionDepartment', 'Institution/Department (dc.contributor, dc.description)', false UNION
  SELECT 20, 'standardDigitalIdentifier', 'Standard Digital Identifier (dc.identifier)', false UNION
  SELECT 21, 'localDigitalIdentifier', 'Local Digital Identifier (dc.identifier)', false UNION
  SELECT 22, 'editionRevisionInformation', 'Edition/Revision Information (dc.description, dcterms.hasVersion)', false UNION
  
  SELECT 23, 'alternativeTitle', 'Alternative Title (dcterms.alternative)', false UNION
  SELECT 24, 'genre', 'Genre (dc.type)', false UNION
  SELECT 25, 'tableOfContents', 'Table of Contents (dcterms.tableOfContents)', false UNION
  SELECT 26, 'contributor', 'Contributor (dc.contributor, dcterms.contributor)', false UNION
  SELECT 27, 'relatedResource', 'Related Resource (dcterms.isPartOf)', false UNION
  SELECT 28, 'originalPublisher', 'Original Publisher (dc.publisher)', false UNION
  SELECT 29, 'physicalExtent', 'Physical Extent (dcterms.extent)', false UNION
  SELECT 30, 'sponsor', 'Sponsor (dc.contributor, dc.description)', false UNION
  
  SELECT 31, 'sourceCollection', 'Source Collection (dc.relation, dcterms.relation)', false UNION
  SELECT 32, 'originalResource', 'Original Resource (dc.source, dcterms.source)', false UNION
  SELECT 33, 'notes', 'Notes (dc.description, dc.provenance)', false UNION
  SELECT 34, 'origin', 'Original Place of Publication, Production or Manufacture (dc.description)', false UNION
  SELECT 35, 'audience', 'Audience Level (dc.audience, dcterms.audience)', false UNION
  SELECT 36, 'classification', 'Classification (dc.description)', false UNION
  SELECT 37, 'itemIdentifier', 'Physical Item Identifier (dc.identifier)', false UNION
  SELECT 38, 'itemLocation', 'Physical Item Location (dc.description)', false UNION
  SELECT 39, 'details', 'Details (local.details)', false UNION
  SELECT 40, 'spatial', 'Spatial (dcterms.spatial)', false UNION
  SELECT 41, 'preferredPlayer', 'Preferred Player', false

) M WHERE NOT EXISTS(SELECT * FROM INTERNAL_METADATA);
