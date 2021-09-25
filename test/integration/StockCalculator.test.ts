import StockCalculator from "../../src/domain/service/StockCalculator";
import StockEntry from "../../src/domain/entity/StockEntry";

test("Should calculate item stock", function() {
    const stockCalculator = new StockCalculator();
    const stockEntries = [
        new StockEntry("1", "in", 3, new Date()),
        new StockEntry("1", "out", 2, new Date()),
        new StockEntry("1", "in", 2, new Date())
    ];
    const quantity = stockCalculator.calculate(stockEntries);
    expect(quantity).toBe(3);

});