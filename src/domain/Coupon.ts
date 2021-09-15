export default class Coupon {
    name: string;
    percentDiscount: number;
    
    constructor(name: string, percentDiscount: number) {
        this.name = name;
        this.percentDiscount = percentDiscount;
    }
}