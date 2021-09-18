import Order from "../entity/Order";

export default interface OrderRepository {

    getNextOrderId(): string;
    save(order: Order): void;
    findById(id: string): Order;
}