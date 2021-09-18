import Coupon from '../../src/domain/entity/Coupon';
import Order from '../../src/domain/entity/Order';

test("Should not create order using an invalid cpf", function () {
    const cpf = '222.222.222.22';
    expect(() => new Order(cpf)).toThrow(new Error('Invalid cpf'));
});

test("Should create order with 3 itens (description, price e quantity)", function() {
    const cpf = '154.106.518.20';
    const order = new Order(cpf);
    order.addItem('1', 1000, 2);
    order.addItem('2', 5000, 1);
    order.addItem('3', 30, 3);
    const total = order.total;
    expect(total).toBe(7090);
});

test("Should create order using coupon (description, price e quantity)", function() {
    const cpf = '000.000.001.91';
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() +1);
    const order = new Order(cpf);
    order.addItem('1', 1000, 2);
    order.addItem('2', 5000, 1);
    order.addItem('3', 30, 3);
    order.addCoupon(new Coupon('FREE20', 20, tomorrow));
    const total = order.total;
    expect(total).toBe(5672);
});

test("Should create order using expired coupon (description, price e quantity)", function() {
    const cpf = '000.000.001.91';
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() -1);
    const order = new Order(cpf);
    order.addItem('1', 1000, 2);
    order.addItem('2', 5000, 1);
    order.addItem('3', 30, 3);
    order.addCoupon(new Coupon('FREE20_EXPIRED', 20, yesterday));
    const total = order.total;
    expect(total).toBe(7090);
});