"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderItem {
    constructor(id, price, quantity) {
        this.id = id;
        this.price = price;
        this.quantity = quantity;
    }
    get total() {
        return this.price * this.quantity;
    }
}
exports.default = OrderItem;
