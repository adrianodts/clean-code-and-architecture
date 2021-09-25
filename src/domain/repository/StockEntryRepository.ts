import StockEntry from "../entity/StockEntry";

export default interface StockEntryRepository {
    
    getByIdItem(idItem: string) : Promise<StockEntry[] | undefined>;
    save(stockEntry: StockEntry) : Promise<void>;
}