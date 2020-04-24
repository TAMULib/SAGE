alter table discovery_view add column description varchar(1000) not null default '';
alter table job_operators add column operators_order int4 not null default 0;
update job_operators set operators_order=operators_id;