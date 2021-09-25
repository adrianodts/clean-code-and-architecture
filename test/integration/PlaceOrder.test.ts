import PlaceOrder from "../../src/application/place-order/PlaceOrder";
import ZipcodeCalculatorAPIMemory from "../../src/infra/gateway/memory/ZipcodeCalculatorAPIMemory";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import MemoryRepositoryFactory from "../../src/infra/factory/MemoryRepositoryFactory";
import RepositoryFactory from "../../src/domain/factory/RepositoryFactory";
import ZipcodeCalculatorAPI from "../../src/domain/gateway/ZipcodeCalculatorAPI";
import PlaceOrderInputDTO from "../../src/application/place-order/PlaceOrderInputDTO";


let repositoryFactory: RepositoryFactory;
let zipcodeCalculatorAPI: ZipcodeCalculatorAPI;

beforeEach(async () => {
    repositoryFactory = new MemoryRepositoryFactory();
    zipcodeCalculatorAPI = new ZipcodeCalculatorAPIMemory();
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
    const repositoryFactory = new MemoryRepositoryFactory();
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculatorAPI);
    const output = await placeOrder.execute(placeOrderInputDTO);
    expect(output.code).toBe("202100000001");
});

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
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculatorAPI);
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
    repositoryFactory = new MemoryRepositoryFactory();
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculatorAPI);
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
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculatorAPI);
    const output = await placeOrder.execute(placeOrderInputDTO);
    expect(output.freight).toBe(310);
});

test("should place an order calculating tax", async () => {
    const cpf = "000.000.001.91";
    const placeOrderInputDTO = new PlaceOrderInputDTO({
        cpf: cpf, 
        zipcode: "11.111-11",
        items: [
            { id: "1", quantity: 2 }, // (1000 * 15)/100 = 300
            { id: "2", quantity: 1 }, // (5000 * 15)/100 = 750
            { id: "3", quantity: 3 }  // (30 * 5)/100 = 4,5
        ],
        issueDate: new Date(2021, 1, 1),
        coupon: "FREE20_EXPIRED"
    });
    const repositoryFactory = new MemoryRepositoryFactory();
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculatorAPI);
    const output = await placeOrder.execute(placeOrderInputDTO);
    //expect(output.code).toBe("202100000001");
    expect(output.taxes).toBe(1054.5);
    
});

test("should place an order in database calculating tax", async () => {
    const cpf = "000.000.001.91";
    const placeOrderInputDTO = new PlaceOrderInputDTO({
        cpf: cpf, 
        zipcode: "11.111-11",
        items: [
            { id: "1", quantity: 2 }, // (1000 * 15)/100 = 300
            { id: "2", quantity: 1 }, // (5000 * 15)/100 = 750
            { id: "3", quantity: 3 }  // (30 * 5)/100 = 4,5
        ],
        issueDate: new Date(2021, 1, 1),
        coupon: "FREE20_EXPIRED"
    });
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculatorAPI);
    const output = await placeOrder.execute(placeOrderInputDTO);
    expect(output.taxes).toBe(1054.5);
    
});

test("should place an order in database calculating tax in november", async () => {
    const cpf = "000.000.001.91";
    const placeOrderInputDTO = new PlaceOrderInputDTO({
        cpf: cpf, 
        zipcode: "11.111-11",
        items: [
            { id: "1", quantity: 2 }, // (1000 * 5)/100 = 100
            { id: "2", quantity: 1 }, // (5000 * 5)/100 = 250
            { id: "3", quantity: 3 }  // (30 * 1)/100 = 0.9
        ],
        issueDate: new Date("2020-11-19"),
        coupon: "FREE20_EXPIRED"
    });
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculatorAPI);
    const output = await placeOrder.execute(placeOrderInputDTO);
    expect(output.taxes).toBe(350.9);
    
});


test("should not place an order when item out of stock", async () => {
    const cpf = "000.000.001.91";
    const placeOrderInputDTO = new PlaceOrderInputDTO({
        cpf: cpf, 
        zipcode: "11.111-11",
        items: [
            { id: "1", quantity: 50 }
        ],
        issueDate: new Date(2021, 1, 1),
        coupon: "FREE20_EXPIRED"
    });
    const repositoryFactory = new MemoryRepositoryFactory();
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculatorAPI);
    await expect(placeOrder.execute(placeOrderInputDTO)).rejects.toThrow(new Error("There is an item out of stock"));
});