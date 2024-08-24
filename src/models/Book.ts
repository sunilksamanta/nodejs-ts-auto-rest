import { Document, Schema } from 'mongoose';
import { BaseDocument, BaseModel } from '../factory/db/BaseModel';
import { Field, Model } from '../factory/decorators/model';

export interface IBook extends BaseDocument {
  title: string;
  author: string;
  year?: number;
}

// @Model('Book')
export class BookModel extends BaseModel<IBook> {
  constructor(name: string, schema: Schema) {
    super(name, schema);
  }

  @Field<string>({ type: String, required: true })
  title!: string;

  @Field<string>({ type: String, required: true })
  author!: string;

  @Field<number>({ type: Number })
  year?: number;

  @Field<Date>({ type: Date })
  createdAt!: Date;

  @Field<Date>({ type: Date })
  updatedAt!: Date;
}

export type BookDocument = IBook & Document;
