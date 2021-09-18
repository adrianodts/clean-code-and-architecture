import Coupon from "../../../domain/entity/Coupon";
import CouponRepository from "../../../domain/repository/CouponRepository";
import Database from "../../database/Database";

export default class CouponRepositoryDatabase implements CouponRepository {

    database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    async getByName(code: string): Promise<Coupon | undefined> {
        const couponData = await this.database.one("select * from ccca.coupon where code = $1", code);
        return new Coupon(couponData.code, couponData.percentdiscount, new Date(couponData.expired_date));
    }

}