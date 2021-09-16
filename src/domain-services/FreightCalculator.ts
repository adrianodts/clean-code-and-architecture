import Item from "../domain/Item";

export default class FreightCalculator {
    static MINIMUM_FREIGHT_VALUE = 10;

    static calculate(distance: number, item: Item): number {
        const calculatedFreightValue = distance * item.getVolume() * (item.getDensity() / 100);
        return (calculatedFreightValue > this.MINIMUM_FREIGHT_VALUE ? calculatedFreightValue : this.MINIMUM_FREIGHT_VALUE);
    }
}