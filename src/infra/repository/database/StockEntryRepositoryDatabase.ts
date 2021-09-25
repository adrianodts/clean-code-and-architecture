import StockEntry from "../../../domain/entity/StockEntry";
import StockEntryRepository from "../../../domain/repository/StockEntryRepository";
import Database from "../../database/Database";

export default class StockEntryRepositoryDatabase implements StockEntryRepository {

    database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    async save(stockEntry: StockEntry): Promise<void> {
        await this.database.one("insert into ccca.stock_entry (id_item, operation, quantity, date) values ($1, $2, $3, $4)", [
            stockEntry.idItem, stockEntry.operation, stockEntry.quantity, stockEntry.date
        ]);
    }

    async getByIdItem(idItem: string): Promise<StockEntry[] | undefined> {
        const stockEntryData = await this.database.many("select * from ccca.stock_entry where id_item = $1", idItem);
        let stockEntries = [];
        for (const stockEntry of stockEntryData) {
            stockEntries.push(new StockEntry(stockEntry.id_item, stockEntry.operation, stockEntry.quantity, new Date(stockEntry.date)));
        }
        return stockEntries;
    }

}