import { NextFunction, Request, Response } from "express";

export interface CustomRouteT { path: string, method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', handler: (req: Request, res: Response, next: NextFunction) => Promise<void> };