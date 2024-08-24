/**
 * Decorators for the factory pattern
 */

import {Request, Response, NextFunction} from "express";


/**
 * A decorator for controller methods in an Express application.
 *
 * This decorator wraps the original method to handle HTTP requests and responses.
 * It ensures that the method's result is sent as a JSON response and any errors
 * are passed to the next middleware for error handling.
 *
 * @returns {Function} A function that modifies the method descriptor.
 * @constructor
 */
function Controller (): (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor {
    return function (
        target: unknown,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            try {
                const result = await originalMethod.apply(this, [req, res, next]);
                res.json({data: result, status: 'success'});
            } catch (error) {
                console.error(error);
                if( error instanceof Error ) {
                    res.status(500).json({error: error.message, status: 'error'});
                } else if( typeof error === 'string' ) {
                    res.status(500).json({error, status: 'error'});
                } else {
                    res.status(500).json({error: 'An unknown error occurred', status: 'error'});
                }
            }
        };

        return descriptor;
    };
}
export { Controller };
