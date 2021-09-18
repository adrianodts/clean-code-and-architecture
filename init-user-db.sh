#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER docker;
    CREATE DATABASE app;
    GRANT ALL PRIVILEGES ON DATABASE app TO docker;
    CREATE SCHEMA ccca;
    CREATE TABLE ccca.item (
        id serial,
        description text,
        price numeric,
        height integer,
        witdh integer,
        length interger,
        weight integer
    );
EOSQL