"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const express_validator_1 = require("express-validator");
const http_error_1 = require("./http-error");
const myValidationResult = express_validator_1.validationResult.withDefaults({
    formatter: error => {
        return `${error.param} : ${error.msg}`.trim();
    },
});
const validateRequest = (req, _res, next) => {
    const errors = myValidationResult(req);
    if (!errors.isEmpty()) {
        const validationError = new http_error_1.ValidationError(errors.array()[0]);
        next(validationError);
    }
    req.query = (0, express_validator_1.matchedData)(req, { locations: ['query'] });
    req.body = (0, express_validator_1.matchedData)(req, { locations: ['body'] });
    req.params = (0, express_validator_1.matchedData)(req, { locations: ['params'] });
    next();
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=validate-request.js.map