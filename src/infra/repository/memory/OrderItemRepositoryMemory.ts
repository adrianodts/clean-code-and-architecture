import OrderItem from "../../../domain/entity/OrderItem";
import OrderItemRepository from "../../../domain/repository/OrderItemRepository";

export default class OrderItemRepositoryMemory implements OrderItemRepository{
    save(orderItem: OrderItem): void {
        throw new Error("Method not implemented.");
    }
    get(code: string): OrderItem[] | undefined {
        throw new Error("Method not implemented.");
    }

    // orderItems: OrderItem[];
    
    // constructor( ) {
    //     this.orderItems = [
    //         { id: "1", code: "202100000001", price: 1000, quantity: 2, getTotal():  2000 },
    //         { id: "2", code: "202100000001", price: 5000, quantity: 1, getTotal(): 5000 },
    //         { id: "3", code: "202100000001", price: 30, quantity: 3, getTotal(): 90 }
    //     ];
    // }

    // save(orderItem: OrderItem): void {
    //     this.orderItems.push(orderItem);
    // }
    // get(code: string): OrderItem[] | undefined {
    //     return this.orderItems.filter(orderItem => orderItem.code === code);
    // }
}