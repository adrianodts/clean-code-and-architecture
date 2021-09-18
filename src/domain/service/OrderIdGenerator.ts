export default class OrderIdGenerator {
    
    static generate(orderIdSequence: string) : string {
        const year = new Date().getFullYear();
        return year.toString().concat(orderIdSequence.toString().padStart(8, '0'));
    }
}