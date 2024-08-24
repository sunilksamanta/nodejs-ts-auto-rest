import { Schema } from 'mongoose';
import { BaseModel, BaseDocument } from './BaseModel';
import 'reflect-metadata';
import { FieldOptions, PrimitiveType } from '../decorators/model';

const MODEL_METADATA_KEY = Symbol('model');
const FIELD_METADATA_KEY = Symbol('field');

type ModelFields = Record<string, FieldOptions<PrimitiveType>>;

export function createModel<T extends BaseDocument>(target: new () => T): BaseModel<T> {
  const modelName = Reflect.getMetadata(MODEL_METADATA_KEY, target) as string | undefined;
  const fields = Reflect.getMetadata(FIELD_METADATA_KEY, target) as ModelFields | undefined;

  if (!modelName) {
    throw new Error(`Model name not found for ${target.name}. Did you forget to use @Model decorator?`);
  }

  if (!fields) {
    throw new Error(`Fields not found for ${target.name}. Did you forget to use @Field decorators?`);
  }

  const schema = new Schema(fields);

  return new BaseModel<T>(modelName, schema);
}