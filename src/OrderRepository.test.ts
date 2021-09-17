import OrderIdGenerator from "./domain-services/OrderIdGenerator";
import Coupon from "./domain/Coupon";
import Order from "./domain/Order";
import OrderRepositoryMemory from "./infraestructure-services/repository/OrderRepositoryMemory";

test('Should save an order in repository', () => {
    const orderRepository = new OrderRepositoryMemory();
    const cpf = '000.000.001.91';
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() +1);
    let order = new Order(cpf);
    order.id = OrderIdGenerator.generate(orderRepository.getNextOrderId());
    order.addItem('1', 1000, 2);
    order.addItem('2', 5000, 1);
    order.addItem('3', 30, 3);
    order.addCoupon(new Coupon('FREE20', 20, tomorrow));
    orderRepository.save(order);

    order = orderRepository.findById(order.id);
    const today = new Date().toISOString().slice(0,10);
    const orderDate = order.orderDate.toISOString().slice(0,10);
    expect(orderDate).toBe(today);
});