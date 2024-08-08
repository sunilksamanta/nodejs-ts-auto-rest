import BaseModule from "../factory/BaseModule";
import {Controller} from "../factory/decorators";

class Employee extends BaseModule {
    constructor() {
        super();
        this.registerRoute( {
            path: '/names-only',
            method: 'GET',
            handler: this.getEmployeeNamesOnly
        })
    }

    @Controller()
    async getEmployeeNamesOnly(): Promise<string[]> {
        return ['John Doe', 'Jane Doe'];
    }

}
export default Employee;
