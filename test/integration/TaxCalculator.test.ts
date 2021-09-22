import Item from "../../src/domain/entity/Item";
import TaxTable from "../../src/domain/entity/TaxTable";
import TaxCalculatorFactory from "../../src/domain/factory/TaxCalculatorFactory";

test("Should calculate guitar tax on normal months", () => {
    const date = new Date("2020-09-19");
    const item = new Item("1", "Guitarra", 1000, 100, 50, 30, 8);
    const taxTable = [
        new TaxTable("1", "default", 15),
        new TaxTable("1", "november", 5),
    ];
    const taxCalculator = TaxCalculatorFactory.create(date);
    const amount = taxCalculator.calculate(item, taxTable);
    expect(amount).toBe(150);
});

test("Should calculate guitar tax on november", () => {
    const date = new Date("2020-11-19");
    const item = new Item("1", "Guitarra", 1000, 100, 50, 30, 8);
    const taxTable = [
        new TaxTable("1", "default", 15),
        new TaxTable("1", "november", 5),
    ];
    const taxCalculator = TaxCalculatorFactory.create(date);
    const amount = taxCalculator.calculate(item, taxTable);
    expect(amount).toBe(50);
});


test("Should calculate Cabo tax on normal months", () => {
    const date = new Date("2020-09-19");
    const item = new Item("3", "Cabo", 30, 10, 10, 10, 1);
    const taxTable = [
        new TaxTable("3", "default", 5),
        new TaxTable("3", "november", 1),
    ];
    const taxCalculator = TaxCalculatorFactory.create(date);
    const amount = taxCalculator.calculate(item, taxTable);
    expect(amount).toBe(1.5);
});

test("Should calculate Cabo tax on november", () => {
    const item = new Item("3", "Cabo", 30, 10, 10, 10, 1);
    const date = new Date("2020-11-19");
    const taxTable = [
        new TaxTable("3", "default", 5),
        new TaxTable("3", "november", 1),
    ];
    const taxCalculator = TaxCalculatorFactory.create(date);
    const amount = taxCalculator.calculate(item, taxTable);
    expect(amount).toBe(0.3);
});