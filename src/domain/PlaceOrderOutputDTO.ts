export default class PlaceOrderOutputDTO {
    
    total: number;
    freight: number;

    constructor({ total, freight } : { total: number, freight: number }) {
        this.total = total;
        this.freight = freight;
    }
}