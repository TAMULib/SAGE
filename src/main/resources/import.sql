INSERT INTO INTERNAL_METADATA SELECT * FROM (
  SELECT 1, 'id', 'Id', true UNION
  SELECT 2, 'title', 'Title', true UNION
  SELECT 3, 'creator', 'Creator', false UNION
  SELECT 4, 'created', 'Created', false UNION
  SELECT 5, 'subject', 'Subject', false UNION
  SELECT 6, 'format', 'Format', false UNION
  SELECT 7, 'language', 'Language', false UNION
  SELECT 8, 'terms.identifier', 'Identifier', false UNION
  SELECT 9, 'isPartOf', 'Part Of', false
) M WHERE NOT EXISTS(SELECT * FROM INTERNAL_METADATA);