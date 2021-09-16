import PlaceOrderInputDTO from "./domain/PlaceOrderInputDTO";
import PlaceOrder from "./domain/PlaceOrder";

test("should place an order", () => {
    const cpf = '000.000.001.91';
    const placeOrderInputDTO = new PlaceOrderInputDTO({
        cpf: cpf, 
        items: [
            { description: 'Guitarra', price: 1000, quantity: 2 },
            { description: 'Amplificador', price: 5000, quantity: 1 },
            { description: 'Cabo', price: 30, quantity: 3 }
        ], 
        coupon: 'FREE20'
    });
    const placeOrder = new PlaceOrder();
    const orderOutputDTO = placeOrder.execute(placeOrderInputDTO);
    expect(orderOutputDTO.total).toBe(5672);
});