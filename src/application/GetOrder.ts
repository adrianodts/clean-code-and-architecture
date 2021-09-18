import FreightCalculator from "../domain/service/FreightCalculator";
import CouponRepository from "../domain/repository/CouponRepository";
import ItemRepository from "../domain/repository/ItemRepository";
import OrderRepository from "../domain/repository/OrderRepository";
import ZipcodeCalculatorAPI from "../domain/gateway/ZipcodeCalculatorAPI";
import Order from "../domain/entity/Order";
import PlaceOrderInputDTO from "./PlaceOrderInputDTO";
import PlaceOrderOutputDTO from "./PlaceOrderOutputDTO";
import GetOrderOutput from "./GetOrderOutput";

export default class GetOrder {

    orderRepository: OrderRepository;
    itemRepository: ItemRepository;
    couponRepository: CouponRepository;
    
    constructor(itemRepository: ItemRepository, couponRepository: CouponRepository, orderRepository: OrderRepository) {
        this.itemRepository = itemRepository;
        this.couponRepository = couponRepository;
        this.orderRepository = orderRepository;
    }
    
    async execute(code: string): Promise<GetOrderOutput> {
        const order = await this.orderRepository.get(code);
        //const items = this.orderItemRepository.getByCode(order.code);
        const orderItems: any[] = [];
        for(const orderItem of order.items) {
            const item = await this.itemRepository.getById(orderItem.id);
            const orderItemOutput = {
                itemDescription: item?.description,
                price: orderItem.price,
                quantity: orderItem.quantity
            }
            orderItems.push(orderItemOutput);
        }
        return new GetOrderOutput({
            code: order.code.value,
            freight: order.freight,
            total: order.getTotal(),
            orderItems
        });
        // if(input.coupon) {
        //     const coupon = this.couponRepository.getByName(input.coupon);
        //     if (coupon) {
        //         order.addCoupon(coupon);
        //     }
        // }
        // const total = order.total;
        // this.orderRepository.save(order);
        // return new PlaceOrderOutputDTO({ total, freight: order.freight, code: order.code.value });
    }
}