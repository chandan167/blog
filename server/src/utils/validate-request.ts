import { NextFunction, Request, RequestHandler, Response } from 'express';
import { validationResult, matchedData } from 'express-validator';
import { ValidationError } from './http-error';


const myValidationResult = validationResult.withDefaults({
    formatter: error => {
        return `${error.param} : ${error.msg}`.trim()
    },
});

export const validateRequest: RequestHandler = (req: Request, _res: Response, next: NextFunction) => {
    const errors = myValidationResult(req);
    if (!errors.isEmpty()) {
        const validationError = new ValidationError(errors.array()[0])
        next(validationError);
    }
    req.query = matchedData(req, { locations: ['query'] });
    req.body = matchedData(req, { locations: ['body'] });
    req.params = matchedData(req, { locations: ['params'] })
    next()
}