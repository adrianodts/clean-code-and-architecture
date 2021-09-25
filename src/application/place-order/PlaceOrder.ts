import ZipcodeCalculatorAPI from "../../domain/gateway/ZipcodeCalculatorAPI";
import PlaceOrderInputDTO from "./PlaceOrderInputDTO";
import PlaceOrderOutputDTO from "./PlaceOrderOutputDTO";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import OrderService from "../../domain/service/OrderService";
import StockCalculator from "../../domain/service/StockCalculator";

export default class PlaceOrder {

    repositoryFactory: RepositoryFactory;
    zipcodeCalculator: ZipcodeCalculatorAPI;
    
    constructor(repositoryFactory: RepositoryFactory, zipcodeCalculator: ZipcodeCalculatorAPI) {
        this.repositoryFactory = repositoryFactory;
        this.zipcodeCalculator = zipcodeCalculator;
    }
    
    async execute(input: PlaceOrderInputDTO): Promise<PlaceOrderOutputDTO> {
        const orderService = new OrderService(this.repositoryFactory, this.zipcodeCalculator);
        const order = await orderService.create(input);
        const total = order.getTotal();
        return new PlaceOrderOutputDTO({ 
            freight: order.freight, 
            taxes: order.taxes, 
            total, 
            code: order.code.value 
        });
    }
}