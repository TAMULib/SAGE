INSERT INTO INTERNAL_METADATA SELECT * FROM (
  SELECT 1, 'Id', 'id', true UNION
  SELECT 2, 'Title', 'title', true UNION
  SELECT 3, 'Creator', 'creator', false UNION
  SELECT 4, 'Created', 'created', false UNION
  SELECT 5, 'Subject', 'subject', false UNION
  SELECT 6, 'Format', 'format', false UNION
  SELECT 7, 'Language', 'language', false UNION
  SELECT 8, 'Identifier', 'terms.identifier', false UNION
  SELECT 9, 'Part Of', 'isPartOf', false
) M WHERE NOT EXISTS(SELECT * FROM INTERNAL_METADATA);