START TRANSACTION;

ALTER TABLE discovery_view ADD COLUMN IF NOT EXISTS ascending boolean;
UPDATE discovery_view SET ascending = true;
ALTER TABLE discovery_view ALTER COLUMN ascending SET NOT NULL;

COMMIT;