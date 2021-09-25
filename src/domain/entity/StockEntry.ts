export default class StockEntry {
    idItem: string;
    operation: string;
    quantity: number;
    date: Date;

    constructor(idItem: string, operation: string, quantity: number, date: Date) {
        this.idItem = idItem;
        this.operation = operation;
        this.quantity = quantity;
        this.date = date;
    }
}