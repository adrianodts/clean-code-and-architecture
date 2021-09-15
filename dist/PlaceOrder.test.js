"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrderInputDTO_1 = __importStar(require("./domain/OrderInputDTO"));
const PlaceOrder_1 = __importDefault(require("./domain/PlaceOrder"));
test("should place an order", () => {
    const cpf = '000.000.001.91';
    const orderInputDTO = new OrderInputDTO_1.default(cpf, [
        new OrderInputDTO_1.OrderItemInputDTO('Guitarra', 1000, 2),
        new OrderInputDTO_1.OrderItemInputDTO('Amplificador', 5000, 1),
        new OrderInputDTO_1.OrderItemInputDTO('Cabo', 30, 3)
    ], new OrderInputDTO_1.CouponInputDTO('FREE20', 20));
    const placeOrder = new PlaceOrder_1.default(orderInputDTO);
    const orderOutputDTO = placeOrder.execute();
    expect(orderOutputDTO.total).toBe(5672);
});
