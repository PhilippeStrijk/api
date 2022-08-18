import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors/routes/responseErrors';


export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) throw new UnauthorizedError({ message: 'You need to be authenticated to perform this action'});
    
    next();
};