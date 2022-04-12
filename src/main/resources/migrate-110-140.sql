START TRANSACTION;

ALTER TABLE discovery_view_result_metadata_fields ADD COLUMN result_metadata_fields_order INT4 not null default 0;
ALTER TABLE discovery_view_facet_fields ADD COLUMN facet_fields_order INT4 not null default 0;

WITH _rmf_orders AS (
	SELECT
		RANK() OVER (PARTITION BY discovery_view_id ORDER BY key DESC) AS result_metadata_fields_order,
		discovery_view_id,
		key
	FROM discovery_view_result_metadata_fields
)
UPDATE discovery_view_result_metadata_fields SET result_metadata_fields_order = _rmf_orders.result_metadata_fields_order - 1
FROM _rmf_orders
WHERE discovery_view_result_metadata_fields.discovery_view_id = _rmf_orders.discovery_view_id
AND discovery_view_result_metadata_fields.key = _rmf_orders.key;


WITH _facet_orders AS (
	SELECT
		RANK() OVER (PARTITION BY discovery_view_id ORDER BY key DESC) AS facet_fields_order,
		discovery_view_id,
		key
	FROM discovery_view_facet_fields
)
UPDATE discovery_view_facet_fields SET facet_fields_order = _facet_orders.facet_fields_order - 1
FROM _facet_orders
WHERE discovery_view_facet_fields.discovery_view_id = _facet_orders.discovery_view_id
AND discovery_view_facet_fields.key = _facet_orders.key;

COMMIT;
