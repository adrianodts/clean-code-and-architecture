"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cpf_1 = __importDefault(require("./Cpf"));
const OrderItem_1 = __importDefault(require("./OrderItem"));
class Order {
    constructor(cpf) {
        this.id = '';
        this.cpf = new Cpf_1.default(cpf);
        this.items = [];
        this.freight = 0;
        this.orderDate = new Date();
    }
    get total() {
        let total = this.items.reduce(function (total, item) {
            return total + item.total;
        }, 0);
        if (this.coupon) {
            total -= (total * this.coupon.percentDiscount / 100);
        }
        total += this.freight;
        return total;
    }
    addItem(id, price, quantity) {
        this.items.push(new OrderItem_1.default(id, price, quantity));
    }
    addCoupon(coupon) {
        if (!coupon.isExpired()) {
            this.coupon = coupon;
        }
    }
}
exports.default = Order;
