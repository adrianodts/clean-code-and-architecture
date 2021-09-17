"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FreightCalculator_1 = __importDefault(require("../domain-services/FreightCalculator"));
const Order_1 = __importDefault(require("./Order"));
const PlaceOrderOutputDTO_1 = __importDefault(require("./PlaceOrderOutputDTO"));
class PlaceOrder {
    constructor(itemRepository, couponRepository, orderRepository, zipcodeCalculator) {
        this.itemRepository = itemRepository;
        this.couponRepository = couponRepository;
        this.orderRepository = orderRepository;
        this.zipcodeCalculator = zipcodeCalculator;
    }
    execute(input) {
        let order = new Order_1.default(input.cpf);
        const distance = this.zipcodeCalculator.calculate(input.zipcode, '99.999-99');
        for (const orderItem of input.items) {
            const item = this.itemRepository.getById(orderItem.id);
            if (!item)
                throw new Error('Item not found');
            order.addItem(orderItem.id, item.price, orderItem.quantity);
            order.freight += FreightCalculator_1.default.calculate(distance, item) * orderItem.quantity;
        }
        if (input.coupon) {
            const coupon = this.couponRepository.getByName(input.coupon);
            if (coupon) {
                order.addCoupon(coupon);
            }
        }
        const total = order.total;
        this.orderRepository.save(order);
        return new PlaceOrderOutputDTO_1.default({ total, freight: order.freight });
    }
}
exports.default = PlaceOrder;
