import Coupon from "../entity/Coupon";

export default interface CouponRepository {

    getByName(code: string) : Coupon | undefined;
}