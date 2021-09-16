export default class PlaceOrderInputDTO {
    
    cpf: string;
    items: any;
    coupon: string;

    constructor({ cpf, items, coupon }: { cpf: string, items: any, coupon: string }) {
        this.cpf = cpf;
        this.items = items;
        this.coupon = coupon;
    }
}

// export class PlaceOrderItemInputDTO {
    
//     description: string;
//     price: number;
//     quantity: number;
    
//     constructor({ description, price, quantity }: { description: string, price: number, quantity: number }) {
//         this.description = description;
//         this.price = price;
//         this.quantity = quantity;
//     }
// }

// export class PlaceOrderCouponInputDTO {

//     name: string;
//     percentDiscount: number;
    
//     constructor({ name, percentDiscount }: { name: string, percentDiscount: number }) {
//         this.name = name;
//         this.percentDiscount = percentDiscount;
//     }
// }