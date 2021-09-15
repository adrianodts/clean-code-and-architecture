"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = __importDefault(require("./Order"));
const OrderOutputDTO_1 = __importDefault(require("./OrderOutputDTO"));
class PlaceOrder {
    constructor(orderInputDTO) {
        this.orderInputDTO = orderInputDTO;
        this.order = [];
    }
    execute() {
        const order = new Order_1.default(this.orderInputDTO.cpf);
        this.orderInputDTO.items.forEach(item => {
            order.addItem(item.description, item.price, item.quantity);
        });
        if (this.orderInputDTO.coupon) {
            order.addCoupon(this.orderInputDTO.coupon.name, this.orderInputDTO.coupon.percentDiscount);
        }
        const total = order.total;
        this.order.push(order);
        return new OrderOutputDTO_1.default(total);
    }
}
exports.default = PlaceOrder;
