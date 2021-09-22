import Coupon from "../../../domain/entity/Coupon";
import Order from "../../../domain/entity/Order";
import OrderItem from "../../../domain/entity/OrderItem";
import OrderRepository from "../../../domain/repository/OrderRepository";
import Database from "../../database/Database";

export default class OrderRepositoryDatabase implements OrderRepository {
    database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    async save(order: Order): Promise<void> {
        const orderData = await this.database.one("insert into ccca.order (code, cpf, issue_date, freight, taxes, sequence, coupon_code) values ($1, $2, $3, $4, $5, $6, $7) returning *", [
            order.code.value, order.cpf.cpf, order.issueDate, order.freight, order.taxes, order.sequence, order.coupon?.code]);
        for (const orderItem of order.items) {
            await this.database.one("insert into ccca.order_item (id_order, id_item, price, quantity) values ($1, $2, $3, $4) returning *", [
                orderData.id, orderItem.id, orderItem.price, orderItem.quantity]);
        }

    }

    async get(code: string): Promise<Order> {
        const orderData = await this.database.one("select * from ccca.order where code = $1", code);
        if(!orderData) throw new Error("Order not found");
        const orderItemsData = await this.database.many("select * from ccca.order_item where id_order = $1", orderData.id);
        const order = new Order(orderData.cpf, new Date(orderData.issue_date), orderData.sequence)
        for (const orderItemData of orderItemsData) {
            order.addItem(orderItemData.id_item, parseFloat(orderItemData.price), orderItemData.quantity);
        }
        if (orderData.coupon_code) {
            const couponData = await this.database.one("select * from ccca.coupon where code = $1", orderData.coupon_code);
            const coupon = new Coupon(couponData.code, couponData.percentdiscount, new Date(couponData.expired_date));
            order.addCoupon(coupon);
        }
        order.freight = parseFloat(orderData.freight);
        order.taxes = parseFloat(orderData.taxes);
        return order;
    }

    async count(): Promise<number> {
        const countData = await this.database.one("select count(*)::int as count from ccca.order", undefined);
        return countData.count;
    }

}