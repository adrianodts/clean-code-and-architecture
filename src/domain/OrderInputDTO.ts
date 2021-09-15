export default class OrderInputDTO {
    
    cpf: string;
    items: OrderItemInputDTO[];
    coupon: CouponInputDTO | undefined;

    constructor(cpf: string, items: OrderItemInputDTO[], coupon: CouponInputDTO) {
        this.cpf = cpf;
        this.items = items;
        this.coupon = coupon;
    }
}

export class OrderItemInputDTO {
    
    description: string;
    price: number;
    quantity: number;
    
    constructor(description: string, price: number, quantity: number) {
        this.description = description;
        this.price = price;
        this.quantity = quantity;
    }
}

export class CouponInputDTO {

    name: string;
    percentDiscount: number;
    
    constructor(name: string, percentDiscount: number) {
        this.name = name;
        this.percentDiscount = percentDiscount;
    }
}