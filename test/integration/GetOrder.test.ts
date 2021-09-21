import PlaceOrder from "../../src/application/PlaceOrder";
import PlaceOrderInputDTO from "../../src/application/PlaceOrderInputDTO";
import ZipcodeCalculatorAPIMemory from "../../src/infra/gateway/memory/ZipcodeCalculatorAPIMemory";
import GetOrder from "../../src/application/GetOrder";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import ZipcodeCalculatorAPI from "../../src/domain/gateway/ZipcodeCalculatorAPI";
import RepositoryFactory from "../../src/domain/factory/RepositoryFactory";

let repositoryFactory: RepositoryFactory;
let zipcodeCalculatorAPI: ZipcodeCalculatorAPI;

beforeEach(async () => {
    repositoryFactory = new DatabaseRepositoryFactory();
    zipcodeCalculatorAPI = new ZipcodeCalculatorAPIMemory();
})

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
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculatorAPI);
    const output = await placeOrder.execute(placeOrderInputDTO);
    const getOrder = new GetOrder(repositoryFactory);
    const orderOutput = await getOrder.execute(output.code);
    expect(orderOutput.total).toBe(5982);
    expect(orderOutput.orderItems.length).toBe(3);
});