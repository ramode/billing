CREATE EXTENSION pgcrypto;


CREATE TABLE if not exists service (
    uuid uuid DEFAULT gen_random_uuid() primary key,
    enabled boolean	DEFAULT true,
);


ALTER TABLE login
    ADD COLUMN service_id uuid DEFAULT NULL references service(uuid);

