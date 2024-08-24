import BaseModule from "../factory/BaseModule";
import { Controller } from "../factory/decorators";
import { BookDocument, BookModel } from "../models/Book";

class BookModule extends BaseModule<BookDocument> {
    constructor() {
        super(BookModel);
    }
}

export default BookModule;