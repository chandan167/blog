"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthTokenValidationRules = void 0;
const express_validator_1 = require("express-validator");
exports.AuthTokenValidationRules = [
    (0, express_validator_1.header)('x-token').notEmpty().withMessage('Enter x-token in header').bail(),
];
//# sourceMappingURL=auth.validation.js.map