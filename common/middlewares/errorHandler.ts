import { Request, Response, NextFunction } from 'express';
import { RouteError } from "../errors/base/routeError";
import { logger } from '../logger/logger';


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    if(err instanceof RouteError)
        return res.status(err.status).send({
            success: false,
            errors: err.serializeErrors()
        }); 
    
    return res.status(400).send({
        success: false,
        errors: [{
            name: 'UnkownError',
            type: 'unkown_error',
            field: null,
            message: 'Something went wrong'
        }]
    });
};