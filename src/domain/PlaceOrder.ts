import Order from './Order';
import OrderInputDTO from "./OrderInputDTO";
import OrderOutputDTO from "./OrderOutputDTO";

export default class PlaceOrder {

    orderInputDTO: OrderInputDTO;
    order: Order[];

    constructor(orderInputDTO: OrderInputDTO) {
        this.orderInputDTO = orderInputDTO;
        this.order = [];
    }
    
    execute(): OrderOutputDTO {
        const order = new Order(this.orderInputDTO.cpf);
        this.orderInputDTO.items.forEach(item => {
            order.addItem(item.description, item.price, item.quantity);
        });
        if(this.orderInputDTO.coupon) {
            order.addCoupon(this.orderInputDTO.coupon.name, this.orderInputDTO.coupon.percentDiscount);
        }
        const total = order.total;
        this.order.push(order);
        return new OrderOutputDTO(total);
    }
}