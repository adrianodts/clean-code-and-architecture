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
        zipcode: '11.111-11',
        items: [
            { id: "1", quantity: 2 },
            { id: "2", quantity: 1 },
            { id: "3", quantity: 3 }
        ],
        coupon: 'FREE20'
    });
    const placeOrder = new PlaceOrder_1.default();
    const output = placeOrder.execute(placeOrderInputDTO);
    expect(output.total).toBe(5982);
});
test("should place an order using an expired coupon", () => {
    const cpf = '000.000.001.91';
    const placeOrderInputDTO = new PlaceOrderInputDTO_1.default({
        cpf: cpf,
        zipcode: '11.111-11',
        items: [
            { id: "1", quantity: 2 },
            { id: "2", quantity: 1 },
            { id: "3", quantity: 3 }
        ],
        coupon: 'FREE20_EXPIRED'
    });
    const placeOrder = new PlaceOrder_1.default();
    const output = placeOrder.execute(placeOrderInputDTO);
    expect(output.total).toBe(7400);
});
test("should place an order calculating freight", () => {
    const cpf = '000.000.001.91';
    const placeOrderInputDTO = new PlaceOrderInputDTO_1.default({
        cpf: cpf,
        zipcode: '11.111-11',
        items: [
            { id: "1", quantity: 2 },
            { id: "2", quantity: 1 },
            { id: "3", quantity: 3 }
        ]
    });
    const placeOrder = new PlaceOrder_1.default();
    const output = placeOrder.execute(placeOrderInputDTO);
    expect(output.freight).toBe(310);
});
