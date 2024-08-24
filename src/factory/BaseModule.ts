import { ControllerArgsT, CustomRouteT } from './types/factory';
import { Controller } from "./decorators";
import { BaseDocument, BaseModel } from './db/BaseModel';
import { Schema, SchemaDefinitionProperty } from 'mongoose';
import 'reflect-metadata';

const MODEL_METADATA_KEY = Symbol('model');
const FIELD_METADATA_KEY = Symbol('field');

type SchemaFields = {
    [key: string]: SchemaDefinitionProperty<unknown> | undefined;
};

// interface ModelConstructor<T extends BaseDocument> {
//     new (): BaseModel<T>;
// }

type ModelClass<T extends BaseDocument> = new (name: string, schema: Schema) => BaseModel<T>;



class BaseModule<T extends BaseDocument> {
    moduleName: string = '';
    protected dbModel: BaseModel<T>;

    constructor(modelClass: ModelClass<T>) {
        console.log('BaseModule constructor', modelClass.prototype.constructor.name);
        this.moduleName = this.constructor.name;
        this.dbModel = this.createModel(modelClass);

        this.create = this.create.bind(this);
        this.readAll = this.readAll.bind(this);
        this.read = this.read.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    private createModel(modelClass: ModelClass<T>): BaseModel<T> {
        // console.log('createModel', modelClass.modelName);
        // const modelName = Reflect.getMetadata(MODEL_METADATA_KEY, modelClass) as string | undefined;
        const fields = Reflect.getMetadata(FIELD_METADATA_KEY, modelClass) as SchemaFields | undefined;
        console.log('createModel', fields);

        // if (!modelName) {
        //     throw new Error(`Model name not found for ${modelClass.name}. Did you forget to use @Model decorator?`);
        // }

        // if (!fields) {
        //     throw new Error(`Fields not found for ${modelClass.name}. Did you forget to use @Field decorators?`);
        // }

        const schema = new Schema({}, { 
            timestamps: true // This will automatically manage createdAt and updatedAt
        });
        console.log('createModel', this.moduleName);
        try {
            return new BaseModel<T>(this.moduleName, schema);
        } catch (error) {
            console.error('Error creating model', error);
            throw error;
        }

        
    }

    customRoutes: CustomRouteT[] = [];

    @Controller()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async create({req}: ControllerArgsT): Promise<T> {
        // console.log('create', req);
        return this.dbModel.create({});
    }

    @Controller()
    async readAll(): Promise<T[]> {
        return this.dbModel.findAll();
    }

    @Controller()
    async read({req}: ControllerArgsT): Promise<T | null> {
        return this.dbModel.findById(req.params.id);
    }

    @Controller()
    async update({req}: ControllerArgsT): Promise<T | null> {
        return this.dbModel.update(req.params.id, req.body);
    }

    @Controller()
    async delete({req}: ControllerArgsT): Promise<T | null> {
        return this.dbModel.delete(req.params.id);
    }

    public registerRoute({ path, method, handler }: CustomRouteT): void {
        this.customRoutes.push({ path, method, handler });
    }
}

export default BaseModule;