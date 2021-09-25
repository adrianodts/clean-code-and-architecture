import Coupon from "../../src/domain/entity/Coupon";
import Order from "../../src/domain/entity/Order";
import PgPromiseDatabase from "../../src/infra/database/PgPromiseDatabase";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory";

test('Should save an order in memory repository', async () => {
    const orderRepository = OrderRepositoryMemory.getInstance();
    const sequence = await orderRepository.count() + 1;
    const cpf = '000.000.001.91';
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() +1);
    let order = new Order(cpf, new Date(), sequence);
    order.addItem('1', 1000, 2);
    order.addItem('2', 5000, 1);
    order.addItem('3', 30, 3);
    order.addCoupon(new Coupon('FREE20', 20, tomorrow));
    order.freight = 15;
    order.taxes = 1.5;
    orderRepository.save(order);

    order = await orderRepository.get(order.code.value);
    const today = new Date().toISOString().slice(0,10);
    const orderDate = order.issueDate.toISOString().slice(0,10);
    expect(orderDate).toBe(today);
    expect(order.freight).toBe(15);
    expect(order.taxes).toBe(1.5);
});

test('Should save an order in postgres database repository', async () => {
    const orderRepository = new OrderRepositoryDatabase(PgPromiseDatabase.getInstance());
    const sequence = await orderRepository.count() + 1;
    const cpf = '000.000.001.91';
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() +1);
    let order = new Order(cpf, new Date(), sequence);
    order.addItem('1', 1000, 2);
    order.addItem('2', 5000, 1);
    order.addItem('3', 30, 3);
    order.addCoupon(new Coupon('FREE20', 20, tomorrow));
    order.freight = 15;
    order.taxes = 1.5;
    orderRepository.save(order);

    order = await orderRepository.get(order.code.value);
    const today = new Date().toISOString().slice(0,10);
    const orderDate = order.issueDate.toISOString().slice(0,10);
    expect(orderDate).toBe(today);
    expect(order.freight).toBe(15);
    expect(order.taxes).toBe(1.5);
});
