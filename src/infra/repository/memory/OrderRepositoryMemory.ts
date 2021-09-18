import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";

export default class OrderRepositoryMemory implements OrderRepository {
    orders: Order[];
    
    constructor() {
        this.orders = [];
    }
    
    getNextOrderId(): string {
        if (!this.orders || this.orders.length === 0) return "1";
        return this.orders[this.orders.length -1].id;
    }
    
    save(order: Order): void {
        this.orders.push(order);
    }

    findById(id: string): Order {
        const order = this.orders.find(order => order.id === id);
        if(!order) throw Error('Order not found');
        return order;    
    }

}