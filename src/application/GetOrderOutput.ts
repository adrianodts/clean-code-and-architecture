export default class GetOrderOutput {
    
    code: string;
    // cpf: string;
    // zipcode: string;
    orderItems: { itemDescription: string, price: number, quantity: number } [];
    freight: number;
    total: number;
    //coupon: string | undefined;
    //issueDate: Date;

    // constructor({ code, cpf, zipcode, items, coupon, issueDate } : { code: string, cpf: string, zipcode: string, items: any, coupon: string | undefined, issueDate: Date }) {
    constructor({ code, orderItems, freight, total } : { code: string,  orderItems: any [], freight: number, total: number }) {
        this.code = code;
        // this.cpf = cpf;
        // this.zipcode = zipcode;
        this.orderItems = orderItems;
        this.freight = freight;
        this.total = total;
        // this.coupon = coupon;
        // this.issueDate = issueDate;
    }
    
}