export default class Coupon {
    code: string;
    percentDiscount: number;
    expiredDate: Date;

    constructor(code: string, percentDiscount: number, expiredDate: Date) {
        this.code = code;
        this.percentDiscount = percentDiscount;
        this.expiredDate = expiredDate
    }

    isExpired(): boolean {
        const today = new Date();
        return (this.expiredDate.getTime() < today.getTime())
    }
}