import Coupon from "../../domain/Coupon";
import CouponRepository from "./CouponRepository";

export default class CouponRepositoryMemory implements CouponRepository {
    coupons: Coupon[];
    
    constructor() {
        let tomorrow = new Date();
        tomorrow.setTime(tomorrow.getTime()  +1);
        let yesterday = new Date();
        yesterday.setTime(yesterday.getTime()  -1);
        this.coupons = [
            new Coupon('FREE20', 20, tomorrow),
            new Coupon('FREE20_EXPIRED', 20, yesterday)
        ];
    }

    getByName(code: string): Coupon | undefined {
        return this.coupons.find(coupon => coupon.code === code)
    }

}