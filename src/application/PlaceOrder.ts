import FreightCalculator from "../domain/service/FreightCalculator";
import CouponRepository from "../domain/repository/CouponRepository";
import ItemRepository from "../domain/repository/ItemRepository";
import OrderRepository from "../domain/repository/OrderRepository";
import ZipcodeCalculatorAPI from "../domain/gateway/ZipcodeCalculatorAPI";
import Order from "../domain/entity/Order";
import PlaceOrderInputDTO from "./PlaceOrderInputDTO";
import PlaceOrderOutputDTO from "./PlaceOrderOutputDTO";
import RepositoryFactory from "../domain/factory/RepositoryFactory";

export default class PlaceOrder {

    orderRepository: OrderRepository;
    itemRepository: ItemRepository;
    couponRepository: CouponRepository;
    zipcodeCalculator: ZipcodeCalculatorAPI;
    
    constructor(repositoryFactory: RepositoryFactory, zipcodeCalculator: ZipcodeCalculatorAPI) {
        this.itemRepository = repositoryFactory.createItemRepository();
        this.couponRepository = repositoryFactory.createCouponRepository();
        this.orderRepository = repositoryFactory.createOrderRepository();
        this.zipcodeCalculator = zipcodeCalculator;
    }
    
    async execute(input: PlaceOrderInputDTO): Promise<PlaceOrderOutputDTO> {
        const sequence = await this.orderRepository.count() + 1;
        let order = new Order(input.cpf, input.issueDate, sequence);
        const distance = this.zipcodeCalculator.calculate(input.zipcode, "99.999-99")
        for(const orderItem of input.items) {
            const item = await this.itemRepository.getById(orderItem.id);
            if (!item) throw new Error("Item not found");
            order.addItem(orderItem.id, item.price, orderItem.quantity);
            order.freight += FreightCalculator.calculate(distance, item) * orderItem.quantity;
        }
        if(input.coupon) {
            const coupon = await this.couponRepository.getByName(input.coupon);
            if (coupon) {
                order.addCoupon(coupon);
            }
        }
        const total = order.getTotal();
        this.orderRepository.save(order);
        return new PlaceOrderOutputDTO({ total, freight: order.freight, code: order.code.value });
    }
}