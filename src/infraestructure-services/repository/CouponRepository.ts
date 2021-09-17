import Coupon from "../../domain/Coupon";

export default interface CouponRepository {

    getByName(code: string) : Coupon | undefined;
}