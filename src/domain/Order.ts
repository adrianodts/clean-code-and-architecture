import Coupon from "./Coupon";
import Cpf from "./Cpf";
import OrderItem from "./OrderItem";

export default class Order {
    cpf: Cpf;
    items: OrderItem[];
    coupon: Coupon | undefined;

    constructor(cpf: string) {
        this.cpf = new Cpf(cpf);
        this.items = [];
    }

    get total(): number {
        let total = this.items.reduce(function(total, item) {
            return total + item.total;
        }, 0);

        if (this.coupon) {
            total -= (total * this.coupon.percentDiscount / 100);
        }
        return total;
    }

    addItem(description: string, price: number, quantity: number) {
        this.items.push(new OrderItem(description, price, quantity));
    }

    addCoupon(name: string, percentDiscount: number) {
        this.coupon = new Coupon(name, percentDiscount);
    }
}

