create extension hstore;
CREATE EXTENSION pgcrypto;

CREATE SEQUENCE if not exists account_id as bigint MINVALUE 0 START WITH 1;

CREATE TABLE if not exists account (
id 	bigint	NOT NULL DEFAULT nextval('account_id') PRIMARY KEY,
name	text	DEFAULT 'anon.',
account	text	NULL,
parent	bigint	NOT NULL DEFAULT 0 references account(id),
deleted	boolean	DEFAULT false,
permission_mask text[] DEFAULT ARRAY['payment.read', 'login.login', 'login.read']
);

CREATE TABLE if not exists login (
uuid uuid DEFAULT gen_random_uuid(),
account_id bigint NOT NULL DEFAULT 0 references account(id),
name	text	DEFAULT 'anon.',
login	text	PRIMARY KEY,
password text	DEFAULT '',
permission text[] DEFAULT NULL
);

CREATE or replace function control_num(text) RETURNS text as $fu1$
DECLARE
	x int = 0;
	k int[] = array[23,3,17,7,11,5,19,1];
	le int;
BEGIN
	le:=char_length($1);

FOR i IN 1..le LOOP
	x := x + (substring($1 from i for 1))::int * k[i];
--	raise notice 'Value: %', x;
END LOOP ;
	x := x % 10;
	return concat($1,x);
END
$fu1$ LANGUAGE plpgsql;

CREATE or replace function user_on_insert() RETURNS trigger AS $fu2$
DECLARE
	A_row account%ROWTYPE;

BEGIN
	SELECT * INTO A_row FROM account WHERE NEW.account_id = account.id LIMIT 1;

	IF NEW.login IS NULL THEN
		NEW.login = A_row.account;
	END IF;
	IF NEW.permission IS NULL THEN
		NEW.permission = A_row.permission_mask;
	end IF;
	return NEW;
END
$fu2$ LANGUAGE plpgsql;

CREATE TRIGGER users_trigger BEFORE INSERT ON login FOR EACH ROW EXECUTE PROCEDURE user_on_insert();


CREATE or replace function account_on_insert() RETURNS trigger AS $fu3$
BEGIN
	IF NEW.account IS NULL THEN
		NEW.account = control_num(lpad(NEW.id::text,6,'0'));
	END IF;
	return NEW;
END
$fu3$ LANGUAGE plpgsql;

CREATE TRIGGER account_trigger BEFORE INSERT ON account FOR EACH ROW EXECUTE PROCEDURE account_on_insert();


CREATE INDEX account_idx ON account (account);


INSERT into account(id) values (0);
INSERT into login(login,password,account_id,permission) values ('root', 'admin', 0, ARRAY['payment.read', 'login.login', 'login.write', 'login.read', 'login.set_permission']);
