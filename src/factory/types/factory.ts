import { NextFunction, Request, Response } from "express";
export type RestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export interface ControllerArgsT {
    req: Request;
    res: Response;
    next: NextFunction
}

export interface GenericObjectT{ [key: string]: unknown };
export interface CustomRouteT { path: string, method: RestMethod, handler: ({ req, res, next }: ControllerArgsT) => Promise<unknown> }
