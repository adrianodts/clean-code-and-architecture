"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponInputDTO = exports.OrderItemInputDTO = void 0;
class OrderInputDTO {
    constructor(cpf, items, coupon) {
        this.cpf = cpf;
        this.items = items;
        this.coupon = coupon;
    }
}
exports.default = OrderInputDTO;
class OrderItemInputDTO {
    constructor(description, price, quantity) {
        this.description = description;
        this.price = price;
        this.quantity = quantity;
    }
}
exports.OrderItemInputDTO = OrderItemInputDTO;
class CouponInputDTO {
    constructor(name, percentDiscount) {
        this.name = name;
        this.percentDiscount = percentDiscount;
    }
}
exports.CouponInputDTO = CouponInputDTO;
