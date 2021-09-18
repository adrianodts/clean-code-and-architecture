export default class PlaceOrderOutputDTO {
    
    total: number;
    freight: number;
    code: string;

    constructor({ total, freight, code } : { total: number, freight: number, code: string }) {
        this.total = total;
        this.freight = freight;
        this.code = code;
    }
}