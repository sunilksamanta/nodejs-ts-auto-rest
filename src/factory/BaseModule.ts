import {ControllerArgsT, CustomRouteT} from './types/factory';
import {Controller} from "./decorators";

class BaseModule {
    moduleName: string = '';
    constructor() {
        this.moduleName = this.constructor.name;

        this.create = this.create.bind(this);
        this.readAll = this.readAll.bind(this);
        this.read = this.read.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
    customRoutes: CustomRouteT[] = [];

    // Create operation
    @Controller()
    async create({req}: ControllerArgsT): Promise<object> {
        // Create Entity
        return req.body;
    }

    // Read All operation
    @Controller()
    async readAll(): Promise<object> {
        return { message: 'Read From: ' + this.moduleName };
    }

    // Read Single operation
    @Controller()
    async read({req}: ControllerArgsT): Promise<object> {
        // Read Entity
        return { message: 'Read Single From: ' + this.moduleName, params: req.params };
    }

    // Update operation
    @Controller()
    async update({req}: ControllerArgsT): Promise<object> {
        // Update Entity
        return { message: 'Update From: ' + this.moduleName, params: req.params, body: req.body };
    }

    // Delete operation
    @Controller()
    async delete({req}: ControllerArgsT): Promise<object> {
        // Delete Entity
        return { message: 'Delete From: ' + this.moduleName, params: req.params };
    }

    // // Custom operation
    protected registerRoute({ path, method, handler }: CustomRouteT): void {
        this.customRoutes.push({ path, method, handler });
    }
}

export default BaseModule;
