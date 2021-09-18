import postgres from 'pg-promise';
import Database from './Database';

export default class PgPromiseDatabase implements Database {
    private static instance: PgPromiseDatabase; 
    private connection: any;

    private constructor() {
        this.connection = postgres()('postgres://postgres:postgres@localhost:5432/app');
    }

    static getInstance(): PgPromiseDatabase {
        if (!PgPromiseDatabase.instance) {
            PgPromiseDatabase.instance = new PgPromiseDatabase();
        }
        return PgPromiseDatabase.instance;
    }

    many(query: string, parameters: any) {
        return this.connection.query(query, parameters);
    }
    one(query: string, parameters: any) {
        return this.connection.oneOrNone(query, parameters);
    }

}