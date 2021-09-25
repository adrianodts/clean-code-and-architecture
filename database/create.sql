CREATE SCHEMA ccca;

CREATE TABLE ccca.item (
    id serial,
    description text,
    price numeric,
    height integer,
    width integer,
    length integer,
    weight integer
);

insert into ccca.item (id, description, price, height, width, length, weight) 
values ('1','Guitarra', 1000, 100, 50, 15, 3);

insert into ccca.item (id, description, price, height, width, length, weight) 
values ('2', 'Amplificador', 5000, 50, 50, 50, 22);

insert into ccca.item (id, description, price, height, width, length, weight) 
values ('3', 'Cabo', 30, 10, 10, 10, 1);


CREATE TABLE ccca.coupon (
	code text,
	percentDiscount numeric,
	expired_date timestamp,
	primary key (code)
);

INSERT INTO ccca.coupon (code, percentDiscount, expired_date) values ('FREE20', 20, '2030-12-31');
INSERT INTO ccca.coupon (code, percentDiscount, expired_date) values ('FREE20_EXPIRED', 20, '2021-01-01');

CREATE TABLE ccca.order (
	id serial,
	coupon_code text,
	code text,
	cpf text,
	issue_date timestamp,
	freight numeric,
	sequence integer,
	primary key (id)
);

CREATE TABLE ccca.order_item (
	id_order integer,
	id_item integer,
	price numeric,
	quantity integer,
	primary key (id_order, id_item)
);

CREATE TABLE ccca.tax_table (
	id serial primary key,
	id_item integer,
	type text,
	value numeric
);

INSERT INTO ccca.tax_table (id, id_item, type, value) VALUES (1, 1, 'default', 15);
INSERT INTO ccca.tax_table (id, id_item, type, value) VALUES (2, 2, 'default', 15);
INSERT INTO ccca.tax_table (id, id_item, type, value) VALUES (3, 3, 'default', 5);
INSERT INTO ccca.tax_table (id, id_item, type, value) VALUES (4, 1, 'november', 5);
INSERT INTO ccca.tax_table (id, id_item, type, value) VALUES (5, 2, 'november', 5);
INSERT INTO ccca.tax_table (id, id_item, type, value) VALUES (6, 3, 'november', 1);

ALTER TABLE ccca.order ADD taxes numeric; 

CREATE TABLE ccca.stock_entry (
	id serial primary key,
	id_item integer,
	operation text,
	quantity numeric,
	date timestamp
);

INSERT INTO ccca.stock_entry (id_item, operation, quantity, date) VALUES (1, 'in', 10, now());
INSERT INTO ccca.stock_entry (id_item, operation, quantity, date) VALUES (2, 'in', 10, now());
INSERT INTO ccca.stock_entry (id_item, operation, quantity, date) VALUES (3, 'in', 10, now());
