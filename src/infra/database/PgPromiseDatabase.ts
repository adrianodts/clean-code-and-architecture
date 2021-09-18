import postgres from 'pg-promise';
import Database from './Database';

export default class PgPromiseDatabase implements Database {
    
    connection: any;

    constructor() {
        this.connection = postgres()('postgres://postgres:postgres@localhost:5432/app');
    }

    many(query: string, parameters: any) {
        return this.connection.query(query, parameters);
    }
    one(query: string, parameters: any) {
        return this.connection.oneOrNone(query, parameters);
    }

}