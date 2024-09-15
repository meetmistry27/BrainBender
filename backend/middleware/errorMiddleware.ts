import { Request, Response, NextFunction } from 'express';

export const handleErrors = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next); // Pass any errors to the default error handler
    };
};
