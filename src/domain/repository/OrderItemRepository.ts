import Order from "../entity/Order";
import OrderItem from "../entity/OrderItem";

export default interface OrderItemRepository {

    save(orderItem: OrderItem): void;
    get(code: string): OrderItem[] | undefined;
}