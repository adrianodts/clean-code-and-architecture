export default class PlaceOrderInputDTO {
    
    cpf: string;
    zipcode: string;
    items: any;
    coupon: string | undefined;
    issueDate: Date;

    constructor({ cpf, zipcode, items, coupon, issueDate = new Date() }: { cpf: string, zipcode: string, items: any, coupon?: string, issueDate?: Date }) {
        this.cpf = cpf;
        this.zipcode = zipcode;
        this.items = items;
        this.coupon = coupon;
        this.issueDate = issueDate;
    }
}