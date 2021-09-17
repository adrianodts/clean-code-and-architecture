import Order from "../../domain/Order";

export default interface OrderRepository {

    getNextOrderId(): string;
    save(order: Order): void;
    findById(id: string): Order;
}