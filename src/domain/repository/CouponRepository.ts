import Coupon from "../entity/Coupon";

export default interface CouponRepository {

    getByName(code: string) : Promise<Coupon | undefined>;
}