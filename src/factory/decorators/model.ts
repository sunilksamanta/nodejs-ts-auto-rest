import 'reflect-metadata';
import { Types } from 'mongoose';
import { BaseDocument, BaseModel } from '../db/BaseModel';

const MODEL_METADATA_KEY = Symbol('model');
const FIELD_METADATA_KEY = Symbol('field');

export type PrimitiveType = string | number | boolean | Date | Types.ObjectId | Buffer;

type SchemaType = 
  | StringConstructor 
  | NumberConstructor 
  | BooleanConstructor 
  | DateConstructor 
  | typeof Types.ObjectId
  | BufferConstructor;

type SchemaDefinitionProperty<T> = {
  type: T extends string ? StringConstructor :
        T extends number ? NumberConstructor :
        T extends boolean ? BooleanConstructor :
        T extends Date ? DateConstructor :
        T extends Types.ObjectId ? typeof Types.ObjectId :
        T extends Buffer ? BufferConstructor :
        SchemaDefinition<T>;
  required?: boolean;
  default?: T | (() => T);
  // Add other Mongoose schema options as needed
};

type SchemaDefinition<T> = {
  [K in keyof T]: SchemaDefinitionProperty<T[K]>;
};

export type FieldOptions<T extends PrimitiveType> = SchemaDefinitionProperty<T>;

export function Field<T extends PrimitiveType>(options: FieldOptions<T>) {
  return (target: object, propertyKey: string) => {
    const fields = Reflect.getMetadata(FIELD_METADATA_KEY, target.constructor) || {};
    fields[propertyKey] = options;
    Reflect.defineMetadata(FIELD_METADATA_KEY, fields, target.constructor);
  };
}

type Constructor<T = object> = new (...args: unknown[]) => T;

export function Model<T extends BaseModel<BaseDocument>>(name: string) {
  return function (constructor: Constructor<T>) {
    return class extends constructor {
      static modelName: string = name;
    } as typeof constructor & { modelName: string };
  };
}