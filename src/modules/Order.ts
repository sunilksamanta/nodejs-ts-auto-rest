import { NextFunction, Request, Response } from "express";
import BaseModule from "../factory/BaseModule";

class Order extends BaseModule{

    constructor() {
        super();
        this.registerRoute({
            path: '/my-orders',
            method: 'GET',
            handler: this.myOrders
        })
    }

    async myOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.json({ message: 'My Orders' });
        } catch (error) {
            next(error);
        }
    }

};

export default Order;