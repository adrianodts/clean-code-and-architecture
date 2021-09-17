import PlaceOrderInputDTO from "./domain/PlaceOrderInputDTO";
import PlaceOrder from "./domain/PlaceOrder";
import OrderRepositoryMemory from "./infraestructure-services/repository/OrderRepositoryMemory";
import ItemRepositoryMemory from "./infraestructure-services/repository/ItemRepositoryMemory";
import CouponRepositoryMemory from "./infraestructure-services/repository/CouponRepositoryMemory";
import ZipcodeCalculatorAPIMemory from "./infraestructure-services/ZipcodeCalculatorAPIMemory";

test("should place an order", () => {
    const cpf = '000.000.001.91';
    const placeOrderInputDTO = new PlaceOrderInputDTO({
        cpf: cpf, 
        zipcode: '11.111-11',
        items: [
            { id: "1", quantity: 2 },
            { id: "2", quantity: 1 },
            { id: "3", quantity: 3 }
        ], 
        coupon: 'FREE20'
    });
    const itemRepository = new ItemRepositoryMemory();
    const couponRepository = new CouponRepositoryMemory()
    const orderRepository = new OrderRepositoryMemory();
    const zipcodeCalculatorAPI = new ZipcodeCalculatorAPIMemory();
    const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository, zipcodeCalculatorAPI);
    const output = placeOrder.execute(placeOrderInputDTO);
    expect(output.total).toBe(5982);
});

test("should place an order using an expired coupon", () => {
    const cpf = '000.000.001.91';
    const placeOrderInputDTO = new PlaceOrderInputDTO({
        cpf: cpf, 
        zipcode: '11.111-11',
        items: [
            { id: "1", quantity: 2 },
            { id: "2", quantity: 1 },
            { id: "3", quantity: 3 }
        ], 
        coupon: 'FREE20_EXPIRED'
    });
    const itemRepository = new ItemRepositoryMemory();
    const couponRepository = new CouponRepositoryMemory()
    const orderRepository = new OrderRepositoryMemory();
    const zipcodeCalculatorAPI = new ZipcodeCalculatorAPIMemory();
    const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository, zipcodeCalculatorAPI);
    const output = placeOrder.execute(placeOrderInputDTO);
    expect(output.total).toBe(7400);
});

test("should place an order calculating freight", () => {
    const cpf = '000.000.001.91';
    const placeOrderInputDTO = new PlaceOrderInputDTO({
        cpf: cpf, 
        zipcode: '11.111-11',
        items: [
            { id: "1", quantity: 2 },
            { id: "2", quantity: 1 },
            { id: "3", quantity: 3 }
        ]
    });
    const itemRepository = new ItemRepositoryMemory();
    const couponRepository = new CouponRepositoryMemory()
    const orderRepository = new OrderRepositoryMemory();
    const zipcodeCalculatorAPI = new ZipcodeCalculatorAPIMemory();
    const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository, zipcodeCalculatorAPI);
    const output = placeOrder.execute(placeOrderInputDTO);
    expect(output.freight).toBe(310);
});