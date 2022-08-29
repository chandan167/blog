import { ErrorRequestHandler, RequestHandler, Request, Response, NextFunction } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { HttpError } from "./http-error";



export const asyncResolver = (fun: RequestHandler): RequestHandler => (req: Request, res: Response, next: NextFunction) => Promise.resolve(fun(req, res, next)).catch(next);

export const errorHandler: ErrorRequestHandler = (err: any, _req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpError) {
        return res.status(err.status).json({
            message: err.message,
            name: err.name
        })
    }
    if (process.env['NODE_ENV'] == 'development') {
        return res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: err.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
            name: err.name,
            stack: err.stack
        })
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        name: 'InternalServerError'
    })
}
