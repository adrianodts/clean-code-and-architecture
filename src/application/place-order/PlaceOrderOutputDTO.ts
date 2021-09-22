export default class PlaceOrderOutputDTO {
    
    total: number;
    freight: number;
    code: string;
    taxes: number;

    constructor({ total, freight, taxes, code } : { total: number, freight: number, taxes: number, code: string }) {
        this.total = total;
        this.freight = freight;
        this.taxes = taxes;
        this.code = code;
    }
}