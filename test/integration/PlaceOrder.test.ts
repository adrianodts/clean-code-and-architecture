import PlaceOrder from "../../src/application/PlaceOrder";
import PlaceOrderInputDTO from "../../src/application/PlaceOrderInputDTO";
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory";
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory";
import ZipcodeCalculatorAPIMemory from "../../src/infra/gateway/memory/ZipcodeCalculatorAPIMemory";
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";
import PgPromiseDatabase from "../../src/infra/database/PgPromiseDatabase";
import CouponRepositoryDatabase from "../../src/infra/repository/database/CouponRepositoryDatabase";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";

test("should place an order using 20 percent discount coupon", async () => {
    const cpf = "000.000.001.91";
    const placeOrderInputDTO = new PlaceOrderInputDTO({
        cpf: cpf, 
        zipcode: "11.111-11",
        items: [
            { id: "1", quantity: 2 },
            { id: "2", quantity: 1 },
            { id: "3", quantity: 3 }
        ], 
        coupon: "FREE20"
    });
    const itemRepository = new ItemRepositoryDatabase(PgPromiseDatabase.getInstance());
    const couponRepository = new CouponRepositoryDatabase(PgPromiseDatabase.getInstance())
    const orderRepository = new OrderRepositoryDatabase(PgPromiseDatabase.getInstance());
    const zipcodeCalculatorAPI = new ZipcodeCalculatorAPIMemory();
    const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository, zipcodeCalculatorAPI);
    const output = await placeOrder.execute(placeOrderInputDTO);
    expect(output.total).toBe(5982);
});

test("should place an order using an expired coupon", async () => {
    const cpf = "000.000.001.91";
    const placeOrderInputDTO = new PlaceOrderInputDTO({
        cpf: cpf, 
        zipcode: "11.111-11",
        items: [
            { id: "1", quantity: 2 },
            { id: "2", quantity: 1 },
            { id: "3", quantity: 3 }
        ], 
        coupon: "FREE20_EXPIRED"
    });
    const itemRepository = new ItemRepositoryMemory();
    const couponRepository = new CouponRepositoryMemory()
    const orderRepository = new OrderRepositoryMemory();
    const zipcodeCalculatorAPI = new ZipcodeCalculatorAPIMemory();
    const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository, zipcodeCalculatorAPI);
    const output = await placeOrder.execute(placeOrderInputDTO);
    expect(output.total).toBe(7400);
});

test("should place an order calculating freight", async () => {
    const cpf = "000.000.001.91";
    const placeOrderInputDTO = new PlaceOrderInputDTO({
        cpf: cpf, 
        zipcode: "11.111-11",
        items: [
            { id: "1", quantity: 2 },
            { id: "2", quantity: 1 },
            { id: "3", quantity: 3 }
        ]
    });
    const itemRepository = new ItemRepositoryDatabase(PgPromiseDatabase.getInstance());
    const couponRepository = new CouponRepositoryDatabase(PgPromiseDatabase.getInstance());
    const orderRepository = new OrderRepositoryDatabase(PgPromiseDatabase.getInstance());
    const zipcodeCalculatorAPI = new ZipcodeCalculatorAPIMemory();
    const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository, zipcodeCalculatorAPI);
    const output = await placeOrder.execute(placeOrderInputDTO);
    expect(output.freight).toBe(310);
});

test("should place an order calculating code", async () => {
    const cpf = "000.000.001.91";
    const placeOrderInputDTO = new PlaceOrderInputDTO({
        cpf: cpf, 
        zipcode: "11.111-11",
        items: [
            { id: "1", quantity: 2 },
            { id: "2", quantity: 1 },
            { id: "3", quantity: 3 }
        ],
        issueDate: new Date(2021, 1, 1),
        coupon: "FREE20_EXPIRED"
    });
    const itemRepository = new ItemRepositoryMemory();
    const couponRepository = new CouponRepositoryMemory()
    const orderRepository = new OrderRepositoryMemory();
    const zipcodeCalculatorAPI = new ZipcodeCalculatorAPIMemory();
    const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository, zipcodeCalculatorAPI);
    const output = await placeOrder.execute(placeOrderInputDTO);
    expect(output.code).toBe("202100000001");
});