import BaseModule from "../factory/BaseModule";
import {Controller} from "../factory/decorators";
class Book extends BaseModule {
    constructor() {
        super();

        this.registerRoute({
            path: '/names-only',
            method: 'GET',
            handler: this.getBookNames
        })
    }

    @Controller()
    async getBookNames(): Promise<string[]> {
        return ['Book 1', 'Book 2', 'Book 3'];
    }
}

export default Book;
