"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FreightCalculator_1 = __importDefault(require("../domain-services/FreightCalculator"));
const ZipcodeCalculatorAPIMemory_1 = __importDefault(require("../infraestructure-services/ZipcodeCalculatorAPIMemory"));
const Coupon_1 = __importDefault(require("./Coupon"));
const Item_1 = __importDefault(require("./Item"));
const Order_1 = __importDefault(require("./Order"));
const PlaceOrderOutputDTO_1 = __importDefault(require("./PlaceOrderOutputDTO"));
class PlaceOrder {
    constructor() {
        let tomorrow = new Date();
        tomorrow.setTime(tomorrow.getTime() + 1);
        let yesterday = new Date();
        yesterday.setTime(yesterday.getTime() - 1);
        this.order = [];
        this.coupons = [
            new Coupon_1.default('FREE20', 20, tomorrow),
            new Coupon_1.default('FREE20_EXPIRED', 20, yesterday)
        ];
        this.items = [
            new Item_1.default('1', 'Guitarra', 1000, 100, 50, 15, 3),
            new Item_1.default('2', 'Amplificador', 5000, 50, 50, 50, 22),
            new Item_1.default('3', 'Cabo', 30, 10, 10, 10, 1)
        ];
        this.zipcodeCalculator = new ZipcodeCalculatorAPIMemory_1.default();
    }
    execute(input) {
        const order = new Order_1.default(input.cpf);
        const distance = this.zipcodeCalculator.calculate(input.zipcode, '99.999-99');
        for (const orderItem of input.items) {
            const item = this.items.find(item => item.id === orderItem.id);
            if (!item)
                throw new Error('Item not found');
            order.addItem(orderItem.id, item.price, orderItem.quantity);
            order.freight += FreightCalculator_1.default.calculate(distance, item) * orderItem.quantity;
        }
        if (input.coupon) {
            const coupon = this.coupons.find(coupon => coupon.name === input.coupon);
            if (coupon) {
                order.addCoupon(coupon);
            }
        }
        const total = order.total;
        this.order.push(order);
        return new PlaceOrderOutputDTO_1.default({ total, freight: order.freight });
    }
}
exports.default = PlaceOrder;
