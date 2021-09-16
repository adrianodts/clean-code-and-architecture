"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Coupon_1 = __importDefault(require("./Coupon"));
const Order_1 = __importDefault(require("./Order"));
const PlaceOrderOutputDTO_1 = __importDefault(require("./PlaceOrderOutputDTO"));
class PlaceOrder {
    constructor() {
        this.order = [];
        this.coupons = [
            new Coupon_1.default('FREE20', 20)
        ];
    }
    execute(input) {
        const order = new Order_1.default(input.cpf);
        for (const item of input.items) {
            order.addItem(item.description, item.price, item.quantity);
        }
        if (input.coupon) {
            const coupon = this.coupons.find(coupon => coupon.name === input.coupon);
            if (coupon) {
                order.addCoupon(coupon.name, coupon.percentDiscount);
            }
        }
        const total = order.total;
        this.order.push(order);
        return new PlaceOrderOutputDTO_1.default({ total: total });
    }
}
exports.default = PlaceOrder;
