export default class GetOrderOutput {
    
    code: string;
    orderItems: { itemDescription: string, price: number, quantity: number } [];
    freight: number;
    taxes: number;
    total: number;

    constructor({ code, orderItems, freight, taxes, total } : { 
        code: string,  orderItems: any [], freight: number, taxes: number, total: number }) {
        this.code = code;
        this.orderItems = orderItems;
        this.freight = freight;
        this.taxes = taxes;
        this.total = total;
    }
    
}