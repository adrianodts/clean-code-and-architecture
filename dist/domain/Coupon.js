"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Coupon {
    constructor(name, percentDiscount, expiredDate) {
        this.name = name;
        this.percentDiscount = percentDiscount;
        this.expiredDate = expiredDate;
    }
    isExpired() {
        const today = new Date();
        return (this.expiredDate.getTime() < today.getTime());
    }
}
exports.default = Coupon;
