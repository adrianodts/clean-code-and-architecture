import Coupon from "./Coupon";
import Cpf from "./Cpf";
import OrderItem from "./OrderItem";

export default class Order {

    id: string;
    cpf: Cpf;
    items: OrderItem[];
    coupon: Coupon | undefined;
    freight: number;
    orderDate: Date;

    constructor(cpf: string) {
        this.id = '';
        this.cpf = new Cpf(cpf);
        this.items = [];
        this.freight = 0;
        this.orderDate =  new Date();
    }

    get total(): number {
        let total = this.items.reduce(function(total, item) {
            return total + item.total;
        }, 0);

        if (this.coupon) {
            total -= (total * this.coupon.percentDiscount / 100);
        }
        total += this.freight;
    
        return total;
    }

    addItem(id: string, price: number, quantity: number) {
        this.items.push(new OrderItem(id, price, quantity));
    }

    addCoupon(coupon: Coupon) {
        if (!coupon.isExpired()) {
            this.coupon = coupon;
        }
    }
}

