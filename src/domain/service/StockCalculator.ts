import StockEntry from "../entity/StockEntry";

export default class StockCalculator {

    constructor() {

    }

    calculate(stockEntries: StockEntry[]): number {
        return stockEntries.reduce((total, stockEntry) => {
            if (stockEntry.operation === 'in') {
                return total += stockEntry.quantity;
            }
            return total - stockEntry.quantity;
        }, 0);
    }
}