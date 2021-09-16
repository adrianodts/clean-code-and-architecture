export default class Coupon {
    name: string;
    percentDiscount: number;
    expiredDate: Date;

    constructor(name: string, percentDiscount: number, expiredDate: Date) {
        this.name = name;
        this.percentDiscount = percentDiscount;
        this.expiredDate = expiredDate
    }

    isExpired(): boolean {
        const today = new Date();
        return (this.expiredDate.getTime() < today.getTime())
    }
}