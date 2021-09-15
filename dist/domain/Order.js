"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Coupon_1 = __importDefault(require("./Coupon"));
const Cpf_1 = __importDefault(require("./Cpf"));
const OrderItem_1 = __importDefault(require("./OrderItem"));
class Order {
    constructor(cpf) {
        this.cpf = new Cpf_1.default(cpf);
        this.items = [];
    }
    get total() {
        let total = this.items.reduce(function (total, item) {
            return total + item.total;
        }, 0);
        if (this.coupon) {
            total -= (total * this.coupon.percentDiscount / 100);
        }
        return total;
    }
    addItem(description, price, quantity) {
        this.items.push(new OrderItem_1.default(description, price, quantity));
    }
    addCoupon(name, percentDiscount) {
        this.coupon = new Coupon_1.default(name, percentDiscount);
    }
}
exports.default = Order;
