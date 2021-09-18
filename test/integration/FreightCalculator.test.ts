import FreightCalculator from "../../src/domain/service/FreightCalculator";
import Item from "../../src/domain/entity/Item";

test("Should calculate freight of an item", () => {
    const item = new Item("1", "Amplificador", 5000, 50, 50, 50, 22);
    const distance = 1000;
    const price = FreightCalculator.calculate(distance, item);
    expect(price).toBe(220)
})

test("Should calculate mimimal freight of an item", () => {
    const item = new Item("3", "Cabo", 30, 9, 9, 9, 0.1);
    const distance = 1000;
    const price = FreightCalculator.calculate(distance, item);
    expect(price).toBe(10)
})