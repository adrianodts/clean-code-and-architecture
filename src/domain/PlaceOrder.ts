import Coupon from './Coupon';
import Order from './Order';
import PlaceOrderInputDTO from "./PlaceOrderInputDTO";
import PlaceOrderOutputDTO from "./PlaceOrderOutputDTO";

export default class PlaceOrder {

    order: Order[];
    coupons: Coupon[];

    constructor() {
        this.order = [];
        this.coupons = [
            new Coupon('FREE20', 20)
        ];
    }
    
    execute(input: PlaceOrderInputDTO): PlaceOrderOutputDTO {
        const order = new Order(input.cpf);
        for(const item of input.items) {
            order.addItem(item.description, item.price, item.quantity);
        }
        if(input.coupon) {
            const coupon = this.coupons.find(coupon => coupon.name === input.coupon);
            if (coupon) {
                order.addCoupon(coupon.name, coupon.percentDiscount);
            }
        }
        const total = order.total;
        this.order.push(order);
        return new PlaceOrderOutputDTO({ total: total });
    }
}