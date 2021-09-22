import DefaultTaxCalculator from "../service/DefaultTaxCalculator";
import NovemberTaxCalculator from "../service/NovemberTaxCalculator";
import TaxCalculator from "../service/TaxCalculator";

export default class TaxCalculatorFactory {
    protected static readonly NOVEMBER = 10;

    static create(date: Date): TaxCalculator {
        if (date.getMonth() === TaxCalculatorFactory.NOVEMBER) {
            return new NovemberTaxCalculator();
        }
        return new DefaultTaxCalculator();
    }
}