import { NextFunction, Request, Response } from "express";
import BaseModule from "../factory/BaseModule";

class Product extends BaseModule {

    constructor() {
        super();
        this.registerRoute({ path: '/all', method: 'GET', handler: this.getAll });
    }

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.json({ message: 'Get All' });
        } catch (error) {
            next(error);
        }
    }

}

export default Product;