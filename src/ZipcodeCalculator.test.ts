import ZipcodeCalculatorAPIMemory from "./infraestructure-services/ZipcodeCalculatorAPIMemory";

test('Should calculate the distance between two zipcodes', () => {
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory();
    const distance = zipcodeCalculator.calculate('11.111-111', '99.999-999')
    expect(distance).toBe(1000);
});