export declare class HttpError extends Error {
    status: number;
    constructor(message: string, status?: number);
}
export declare class NotFoundError extends HttpError {
    constructor(message: string);
}
export declare class ValidationError extends HttpError {
    constructor(message: string, status?: number);
}
//# sourceMappingURL=http-error.d.ts.map