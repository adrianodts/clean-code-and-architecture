export default class PlaceOrderOutputDTO {
    
    total: number;

    constructor({ total } : { total: number }) {
        this.total = total;
    }
}