import Coupon from "../../../domain/entity/Coupon";
import CouponRepository from "../../../domain/repository/CouponRepository";

export default class CouponRepositoryMemory implements CouponRepository {
    coupons: Coupon[];
    
    constructor() {
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() +1);
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate()  -1);
        this.coupons = [
            new Coupon("FREE20", 20, tomorrow),
            new Coupon("FREE20_EXPIRED", 20, yesterday)
        ];
    }

    getByName(code: string): Promise<Coupon | undefined> {
        return Promise.resolve(this.coupons.find(coupon => coupon.code === code));
    }

}