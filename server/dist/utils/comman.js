"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.asyncResolver = void 0;
const http_status_codes_1 = require("http-status-codes");
const http_error_1 = require("./http-error");
const asyncResolver = (fun) => (req, res, next) => Promise.resolve(fun(req, res, next)).catch(next);
exports.asyncResolver = asyncResolver;
const errorHandler = (err, req, res, next) => {
    if (err instanceof http_error_1.HttpError) {
        return res.status(err.status).json({
            message: err.message,
            name: err.name
        });
    }
    if (process.env['NODE_ENV'] == 'development') {
        return res.status(err.status || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: err.message || http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR,
            name: err.name,
            stack: err.stack
        });
    }
    return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR,
        name: 'InternalServerError'
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=comman.js.map