import PlaceOrder from "../../src/application/PlaceOrder";
import PlaceOrderInputDTO from "../../src/application/PlaceOrderInputDTO";
import ZipcodeCalculatorAPIMemory from "../../src/infra/gateway/memory/ZipcodeCalculatorAPIMemory";
import GetOrder from "../../src/application/GetOrder";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import MemoryRepositoryFactory from "../../src/infra/factory/MemoryRepositoryFactory";

test("should get an order", async () => {
    const placeOrderInputDTO = new PlaceOrderInputDTO({
        cpf: "000.000.001.91", 
        zipcode: "11.111-11",
        items: [
            { id: "1", quantity: 2 },
            { id: "2", quantity: 1 },
            { id: "3", quantity: 3 }
        ],
        issueDate: new Date(2021, 1, 1),
        coupon: "FREE20"
    });
    const zipcodeCalculatorAPI = new ZipcodeCalculatorAPIMemory();
    const repositoryFactory = new DatabaseRepositoryFactory();
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculatorAPI);
    const output = await placeOrder.execute(placeOrderInputDTO);
    const getOrder = new GetOrder(repositoryFactory);
    const orderOutput = await getOrder.execute(output.code);
    expect(orderOutput.total).toBe(5982);
    expect(orderOutput.orderItems.length).toBe(3);
});