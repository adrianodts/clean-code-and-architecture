test("Should calculato item stock", function() {
    const stockCalculator = new StockCalculator();
    const amount = stockCalculator.calculate();
    expect(amount).toBe(10);

});