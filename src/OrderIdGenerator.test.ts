import OrderIdGenerator from './domain-services/OrderIdGenerator';

test("Should generate order id using format AAAAPPPPPPPP", () => {
    const thisYear = new Date().getFullYear();
    const orderId = thisYear.toString().concat("00000001")
    const newOrderId = OrderIdGenerator.generate("1");
    expect(newOrderId).toBe(orderId)
})