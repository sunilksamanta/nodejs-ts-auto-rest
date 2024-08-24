import { Schema, Model, Document, model } from 'mongoose';

export interface BaseDocument extends Document {
  createdAt: Date;
  updatedAt: Date;
}

export class BaseModel<T extends BaseDocument> {
  protected model: Model<T>;
  static modelName: string;

  constructor(name: string, schema: Schema) {
    console.log('BaseModel constructor', name);
    // schema.add({
    //   createdAt: { type: Date, default: Date.now },
    //   updatedAt: { type: Date, default: Date.now }
    // });

    // schema.pre('save', function(next) {
    //   this.updatedAt = new Date();
    //   next();
    // });

    this.model = model<T>(name, schema);
    console.log('DONE MODEL')

    // return this;
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async findAll(): Promise<T[]> {
    return this.model.find();
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }
}