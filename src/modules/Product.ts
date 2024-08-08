import BaseModule from "../factory/BaseModule";
import {Controller} from "../factory/decorators";

class Product extends BaseModule {

    constructor() {
        super();
        this.registerRoute({ path: '/all', method: 'GET', handler: this.getAll });
    }

    @Controller()
    async getAll(): Promise<object> {
        // Your method logic
        return { message: 'Get All Products' };
    }

}

export default Product;
