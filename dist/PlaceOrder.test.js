"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PlaceOrderInputDTO_1 = __importDefault(require("./domain/PlaceOrderInputDTO"));
const PlaceOrder_1 = __importDefault(require("./domain/PlaceOrder"));
test("should place an order", () => {
    const cpf = '000.000.001.91';
    const placeOrderInputDTO = new PlaceOrderInputDTO_1.default({
        cpf: cpf,
        items: [
            { description: 'Guitarra', price: 1000, quantity: 2 },
            { description: 'Amplificador', price: 5000, quantity: 1 },
            { description: 'Cabo', price: 30, quantity: 3 }
        ],
        coupon: 'FREE20'
    });
    const placeOrder = new PlaceOrder_1.default();
    const orderOutputDTO = placeOrder.execute(placeOrderInputDTO);
    expect(orderOutputDTO.total).toBe(5672);
});
