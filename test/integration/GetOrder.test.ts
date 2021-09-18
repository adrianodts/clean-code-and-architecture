import PlaceOrder from "../../src/application/PlaceOrder";
import PlaceOrderInputDTO from "../../src/application/PlaceOrderInputDTO";
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory";
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory";
import ZipcodeCalculatorAPIMemory from "../../src/infra/gateway/memory/ZipcodeCalculatorAPIMemory";
import GetOrder from "../../src/application/GetOrder";
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";
import PgPromiseDatabase from "../../src/infra/database/PgPromiseDatabase";
import CouponRepositoryDatabase from "../../src/infra/repository/database/CouponRepositoryDatabase";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";

test("should get an order", async () => {
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

    const getOrder = new GetOrder(itemRepository, couponRepository, orderRepository);
    const orderOutput = await getOrder.execute(output.code);

    expect(orderOutput.total).toBe(5982);
    expect(orderOutput.orderItems.length).toBe(3);
});