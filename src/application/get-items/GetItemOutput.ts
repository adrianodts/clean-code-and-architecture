export default class GetItemOutput {
    id: string;
    description: string;
    price: number;
    width: number;
    height: number;
    length: number;
    weight: number;

    constructor (id: string, description: string, price: number, width: number, height: number, length: number, weight: number) {
        this.id = id;
        this.description = description;
        this.price = price;
        this.width = width;
        this.height = height;
        this.length = length;
        this.weight = weight;
    }
}