"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = require("./domain/Order");
class PlaceOrder {
    constructor(orderInputDTO) {
        this.orderInputDTO = orderInputDTO;
        this.order = new Order_1.Order(orderInputDTO.cpf);
    }
    execute() {
        return false;
    }
}
exports.default = PlaceOrder;
