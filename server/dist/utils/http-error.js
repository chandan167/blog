"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.NotFoundError = exports.HttpError = void 0;
const http_status_codes_1 = require("http-status-codes");
class HttpError extends Error {
    constructor(message, status = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) {
        super(message);
        this.status = status;
        this.name = 'HttpError';
    }
}
exports.HttpError = HttpError;
class NotFoundError extends HttpError {
    constructor(message) {
        super(message, http_status_codes_1.StatusCodes.NOT_FOUND);
        this.name = 'NotFound';
    }
}
exports.NotFoundError = NotFoundError;
class ValidationError extends HttpError {
    constructor(message, status = http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY) {
        super(message, status);
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=http-error.js.map