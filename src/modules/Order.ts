import BaseModule from "../factory/BaseModule";
import {Controller} from "../factory/decorators";

class Order extends BaseModule{

    constructor() {
        super();
        this.registerRoute({
            path: '/my-orders',
            method: 'GET',
            handler: this.myOrders
        })
    }

    @Controller()
    async myOrders(): Promise<object> {
        return { message: 'Get MY Orders' };
    }

}

export default Order;
