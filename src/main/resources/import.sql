INSERT INTO INTERNAL_METADATA SELECT * FROM (
  SELECT 1, 'id', 'Id', true UNION
  SELECT 2, 'collection', 'Collection', true UNION
  SELECT 3, 'thumbnailUrl', 'Thumbnail URL', true UNION
  SELECT 4, 'resourceUrl', 'Resource URL', true UNION
  
  SELECT 5, 'title', 'Title (dc.title)', true UNION
  SELECT 6, 'contentType', 'Content Type (dc.type)', false UNION
  SELECT 7, 'digitalPublisher', 'Digital Publisher (dc.publisher)', false UNION
  SELECT 8, 'rightsAccess', 'Rights/Access (dc.rights)', false UNION
  SELECT 9, 'reformatting', 'Reformatting (dc.format)', false UNION
  SELECT 10, 'filename', 'Filename (dc.identifier)', false UNION
  
  SELECT 11, 'subject', 'Subject (dc.subject)', false UNION
  SELECT 12, 'creator', 'Creator (dc.creator)', false UNION
  SELECT 13, 'datePublished', 'Date Published (dc.date.issued)', false UNION
  SELECT 14, 'dateCreated', 'Date Created (dc.date.created)', false UNION
  SELECT 15, 'summaryAbstract', 'Summary/Abstract (dc.description)', false UNION
  SELECT 16, 'language', 'Language (dc.language)', false UNION
  SELECT 17, 'institutionDepartment', 'Institution/Department (dc.contributor, dc.description)', false UNION
  SELECT 18, 'standardDigitalIdentifier', 'Standard Digital Identifier (dc.identifier)', false UNION
  SELECT 19, 'localDigitalIdentifier', 'Local Digital Identifier (dc.identifier)', false UNION
  SELECT 20, 'editionRevisionInformation', 'Edition/Revision Information (dc.description)', false UNION
  
  SELECT 21, 'alternativeTitle', 'Alternative Title (dc.title.alternative)', false UNION
  SELECT 22, 'genre', 'Genre (dc.type)', false UNION
  SELECT 23, 'tableOfContents', 'Table of Contents (dc.description.tableOfContents)', false UNION
  SELECT 24, 'contributor', 'Contributor (dc.contributor)', false UNION
  SELECT 25, 'relatedResource', 'Related Resource (dc.relation.isPartOf, dc.relation.isFormatOf, dc.relation.HasPart, dc.relation.isVersionOf, dc.relation.HasVersion, dc.relation.isReferencedBy, dc.relation.Requires, dc.relation.Replaces, dc.relation.isReplacedBy)', false UNION
  SELECT 26, 'originalPublisher', 'Original Publisher (dc.publisher)', false UNION
  SELECT 27, 'physicalExtent', 'Physical Extent (dc.format.extent)', false UNION
  SELECT 28, 'sponsor', 'Sponsor (dc.contributor, dc.description)', false UNION
  
  SELECT 29, 'sourceCollection', 'Source Collection (dc.relation)', false UNION
  SELECT 30, 'originalResource', 'Original Resource (dc.source)', false UNION
  SELECT 31, 'notes', 'Notes (dc.description, dc.provenance)', false UNION
  SELECT 32, 'origin', 'Original Place of Publication, Production or Manufacture (dc.description)', false UNION
  SELECT 33, 'audience', 'Audience Level (dc.audience)', false UNION
  SELECT 34, 'classification', 'Classification (dc.description)', false UNION
  SELECT 35, 'itemIdentifier', 'Physical Item Identifier (dc.identifier)', false UNION
  SELECT 36, 'itemLocation', 'Physical Item Location (dc.description)', false
) M WHERE NOT EXISTS(SELECT * FROM INTERNAL_METADATA);