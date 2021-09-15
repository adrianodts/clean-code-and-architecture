import Order from './domain/Order';

test("Should not create order using an invalid cpf", function () {
    const cpf = '222.222.222.22';
    expect(() => new Order(cpf)).toThrow(new Error('Invalid cpf'));
});

test("Should create order with 3 itens (description, price e quantity)", function() {
    const cpf = '154.106.518.20';
    const order = new Order(cpf);
    order.addItem('Guitarra', 1000, 2);
    order.addItem('Amplificador', 5000, 1);
    order.addItem('Cabo', 30, 3);
    const total = order.total;
    expect(total).toBe(7090);
});

test("Should create order with using coupon (description, price e quantity)", function() {
    const cpf = '000.000.001.91';
    const order = new Order(cpf);
    order.addItem('Guitarra', 1000, 2);
    order.addItem('Amplificador', 5000, 1);
    order.addItem('Cabo', 30, 3);
    order.addCoupon('FREE20', 20);
    const total = order.total;
    expect(total).toBe(5672);
});

