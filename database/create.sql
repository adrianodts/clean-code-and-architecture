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
