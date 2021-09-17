import FreightCalculator from '../domain-services/FreightCalculator';
import CouponRepository from '../infraestructure-services/repository/CouponRepository';
import ItemRepository from '../infraestructure-services/repository/ItemRepository';
import OrderRepository from '../infraestructure-services/repository/OrderRepository';
import ZipcodeCalculatorAPI from '../infraestructure-services/ZipcodeCalculatorAPI';
import ZipcodeCalculatorAPIMemory from '../infraestructure-services/ZipcodeCalculatorAPIMemory';
import Coupon from './Coupon';
import Item from './Item';
import Order from './Order';
import PlaceOrderInputDTO from "./PlaceOrderInputDTO";
import PlaceOrderOutputDTO from "./PlaceOrderOutputDTO";

export default class PlaceOrder {

    orderRepository: OrderRepository;
    itemRepository: ItemRepository;
    couponRepository: CouponRepository;
    zipcodeCalculator: ZipcodeCalculatorAPI;
    
    constructor(itemRepository: ItemRepository, couponRepository: CouponRepository, orderRepository: OrderRepository, zipcodeCalculator: ZipcodeCalculatorAPI) {
        this.itemRepository = itemRepository;
        this.couponRepository = couponRepository;
        this.orderRepository = orderRepository;
        this.zipcodeCalculator = zipcodeCalculator;
    }
    
    execute(input: PlaceOrderInputDTO): PlaceOrderOutputDTO {
        let order = new Order(input.cpf);
        const distance = this.zipcodeCalculator.calculate(input.zipcode, '99.999-99')
        for(const orderItem of input.items) {
            const item = this.itemRepository.getById(orderItem.id);
            if (!item) throw new Error('Item not found');
            order.addItem(orderItem.id, item.price, orderItem.quantity);
            order.freight += FreightCalculator.calculate(distance, item) * orderItem.quantity;
        }
        if(input.coupon) {
            const coupon = this.couponRepository.getByName(input.coupon);
            if (coupon) {
                order.addCoupon(coupon);
            }
        }
        const total = order.total;
        this.orderRepository.save(order);
        return new PlaceOrderOutputDTO({ total, freight: order.freight });
    }
}