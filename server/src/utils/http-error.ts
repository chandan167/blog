import { StatusCodes } from "http-status-codes";

export class HttpError extends Error{
    status:number
    constructor(message:string, status:number = StatusCodes.INTERNAL_SERVER_ERROR){
        super(message)
        this.status = status
        this.name = 'HttpError';
    }
}

export class NotFoundError extends HttpError{
    constructor(message:string){
        super(message, StatusCodes.NOT_FOUND)
        this.name = 'NotFound';
    }
}


export class ValidationError extends HttpError{
    constructor(message:string, status:number = StatusCodes.UNPROCESSABLE_ENTITY){
        super(message, status)
        this.name = 'ValidationError'
    }
}