import PlaceOrderInputDTO from "../../application/place-order/PlaceOrderInputDTO";
import Order from "../entity/Order";
import StockEntry from "../entity/StockEntry";
import RepositoryFactory from "../factory/RepositoryFactory";
import TaxCalculatorFactory from "../factory/TaxCalculatorFactory";
import ZipcodeCalculatorAPI from "../gateway/ZipcodeCalculatorAPI";
import CouponRepository from "../repository/CouponRepository";
import ItemRepository from "../repository/ItemRepository";
import OrderRepository from "../repository/OrderRepository";
import StockEntryRepository from "../repository/StockEntryRepository";
import TaxTableRepository from "../repository/TaxTableRepository";
import FreightCalculator from "./FreightCalculator";
import StockCalculator from "./StockCalculator";

export default class OrderService {

    orderRepository: OrderRepository;
    itemRepository: ItemRepository;
    taxTableRepository: TaxTableRepository;
    couponRepository: CouponRepository;
    stockEntryRepository: StockEntryRepository;
    zipcodeCalculator: ZipcodeCalculatorAPI;
    stockCalculator: StockCalculator;

    constructor(repositoryFactory: RepositoryFactory, zipcodeCalculator: ZipcodeCalculatorAPI) {
        this.itemRepository = repositoryFactory.createItemRepository();
        this.couponRepository = repositoryFactory.createCouponRepository();
        this.orderRepository = repositoryFactory.createOrderRepository();
        this.taxTableRepository = repositoryFactory.createTaxTableRepository();
        this.stockEntryRepository = repositoryFactory.createStockEntryRepository();
        this.zipcodeCalculator = zipcodeCalculator;
        this.stockCalculator = new StockCalculator();
    }

    async create(input: PlaceOrderInputDTO): Promise<Order> {
        const taxCalculator = TaxCalculatorFactory.create(input.issueDate);
        const sequence = await this.orderRepository.count() + 1;
        let order = new Order(input.cpf, input.issueDate, sequence);
        const distance = this.zipcodeCalculator.calculate(input.zipcode, "99.999-99")
        for(const orderItem of input.items) {
            const item = await this.itemRepository.getById(orderItem.id);
            if (!item) throw new Error("Item not found");
            order.addItem(orderItem.id, item.price, orderItem.quantity);
            order.freight += FreightCalculator.calculate(distance, item) * orderItem.quantity;
            const taxTables = await this.taxTableRepository.getByIdItem(item.id);
            if (!taxTables) throw new Error("Tax for item was not found");
            const taxes = taxCalculator.calculate(item, taxTables);
            order.taxes += taxes * orderItem.quantity;
            const stockEntries = await this.stockEntryRepository.getByIdItem(item.id);
            if (!stockEntries) throw new Error("Item stock not found");
            const stockQuantity = this.stockCalculator.calculate(stockEntries); 
            if (stockQuantity < orderItem.quantity) {
                throw new Error("There is an item out of stock");
            }
            this.stockEntryRepository.save(new StockEntry(item.id, "out", orderItem.quantity, new Date()));
        }
        
        if(input.coupon) {
            const coupon = await this.couponRepository.getByName(input.coupon);
            if (coupon) {
                order.addCoupon(coupon);
            }
        }
        this.orderRepository.save(order);
        return order;
    }
}