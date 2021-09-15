import OrderInputDTO, { CouponInputDTO, OrderItemInputDTO } from "./domain/OrderInputDTO";
import PlaceOrder from "./domain/PlaceOrder";

test("should place an order", () => {
    const cpf = '000.000.001.91';
    const orderInputDTO = new OrderInputDTO(cpf, [
        new OrderItemInputDTO('Guitarra', 1000, 2),
        new OrderItemInputDTO('Amplificador', 5000, 1),
        new OrderItemInputDTO('Cabo', 30, 3)
    ], new CouponInputDTO('FREE20', 20));
    const placeOrder = new PlaceOrder(orderInputDTO);
    const orderOutputDTO = placeOrder.execute();
    expect(orderOutputDTO.total).toBe(5672);
});