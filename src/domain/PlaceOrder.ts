import FreightCalculator from '../domain-services/FreightCalculator';
import ZipcodeCalculatorAPI from '../infraestructure-services/ZipcodeCalculatorAPI';
import ZipcodeCalculatorAPIMemory from '../infraestructure-services/ZipcodeCalculatorAPIMemory';
import Coupon from './Coupon';
import Item from './Item';
import Order from './Order';
import PlaceOrderInputDTO from "./PlaceOrderInputDTO";
import PlaceOrderOutputDTO from "./PlaceOrderOutputDTO";

export default class PlaceOrder {

    order: Order[];
    coupons: Coupon[];
    items: Item[];
    zipcodeCalculator: ZipcodeCalculatorAPI;
    
    constructor() {
        let tomorrow = new Date();
        tomorrow.setTime(tomorrow.getTime()  +1);
        let yesterday = new Date();
        yesterday.setTime(yesterday.getTime()  -1);
        this.order = [];
        this.coupons = [
            new Coupon('FREE20', 20, tomorrow),
            new Coupon('FREE20_EXPIRED', 20, yesterday)
        ];
        this.items = [
            new Item('1','Guitarra', 1000, 100, 50, 15, 3),
            new Item('2', 'Amplificador', 5000, 50, 50, 50, 22),
            new Item('3', 'Cabo', 30, 10, 10, 10, 1)
        ];
        this.zipcodeCalculator = new ZipcodeCalculatorAPIMemory();
    }
    
    execute(input: PlaceOrderInputDTO): PlaceOrderOutputDTO {
        const order = new Order(input.cpf);
        const distance = this.zipcodeCalculator.calculate(input.zipcode, '99.999-99')
        for(const orderItem of input.items) {
            const item = this.items.find(item => item.id === orderItem.id);
            if (!item) throw new Error('Item not found');
            order.addItem(orderItem.id, item.price, orderItem.quantity);
            order.freight += FreightCalculator.calculate(distance, item) * orderItem.quantity;
        }
        if(input.coupon) {
            const coupon = this.coupons.find(coupon => coupon.name === input.coupon);
            if (coupon) {
                order.addCoupon(coupon);
            }
        }
        const total = order.total;
        this.order.push(order);
        return new PlaceOrderOutputDTO({ total, freight: order.freight });
    }
}