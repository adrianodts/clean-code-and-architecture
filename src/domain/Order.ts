import Coupon from "./Coupon";
import Cpf from "./Cpf";
import OrderItem from "./OrderItem";

export default class Order {
    cpf: Cpf;
    items: OrderItem[];
    coupon: Coupon | undefined;
    freight: number;

    constructor(cpf: string) {
        this.cpf = new Cpf(cpf);
        this.items = [];
        this.freight = 0;
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

