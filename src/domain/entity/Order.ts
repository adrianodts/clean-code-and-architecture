import Coupon from "./Coupon";
import Cpf from "./Cpf";
import OrderCode from "./OrderCode";
import OrderItem from "./OrderItem";

export default class Order {

    code: OrderCode;
    cpf: Cpf;
    items: OrderItem[];
    coupon: Coupon | undefined;
    freight: number;
    taxes: number;
    issueDate: Date;
    sequence: number;

    constructor(cpf: string, issueDate: Date = new Date(), sequence: number = 1) {
        this.cpf = new Cpf(cpf);
        this.items = [];
        this.freight = 0;
        this.taxes = 0;
        this.issueDate =  issueDate;
        this.sequence = sequence;
        this.code = new OrderCode(issueDate, sequence);
    }

    getTotal(): number {
        let total = this.items.reduce(function(total, item) {
            return total + item.getTotal();
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

