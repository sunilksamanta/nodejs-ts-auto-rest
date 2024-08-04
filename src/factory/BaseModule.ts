import { NextFunction, Request, Response } from 'express';
import { CustomRouteT } from '../types/factory';

class BaseModule {
    moduleName: string = '';
    constructor() {
        this.moduleName = this.constructor.name;
        this.read = this.read.bind(this);
    }
    customRoutes: CustomRouteT[] = [];
    // Create operation
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
            // Create Entity
            const entity = req.body;
            // Store into the DB
            res.json(entity);
        } catch (error) {
            next(error);
        }
        
    }

    // // Read operation
    async read(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Implement your read logic here
            res.json({ message: 'Read From: ' + this.moduleName });
        } catch (error) {
            next(error);
        }
        
    }

    // async readSingle(req: Request, res: Response) {
    //     // Implement your read single logic here
    // }

    // // Update operation
    // async update(req: Request, res: Response) {
    //     // Implement your update logic here
    // }

    // // Delete operation
    // async delete(req: Request, res: Response) {
    //     // Implement your delete logic here
    // }

    // // Custom operation
    registerRoute({ path, method, handler }: CustomRouteT): void {
        this.customRoutes.push({ path, method, handler });   
    }
}

export default BaseModule;