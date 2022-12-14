"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInValidationRules = exports.signUpValidationRules = void 0;
const express_validator_1 = require("express-validator");
const UserService = __importStar(require("./user.service"));
exports.signUpValidationRules = [
    (0, express_validator_1.body)('firstName').notEmpty().withMessage('First name is required').bail().isString().withMessage('First name must be string'),
    (0, express_validator_1.body)('lastName').optional({ checkFalsy: true }).isString().withMessage('Last name must be string'),
    (0, express_validator_1.body)('email').notEmpty().withMessage('Email is required').bail().isEmail().normalizeEmail().withMessage('Invalid email')
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield UserService.findByEmail(value);
        if (user)
            return Promise.reject('E-mail already in use');
    })),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required').bail().isString().withMessage('Password name must be string')
];
exports.signInValidationRules = [
    (0, express_validator_1.body)('email').notEmpty().withMessage('Email is required').bail().isEmail().normalizeEmail().withMessage('Invalid email'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required').bail().isString().withMessage('Password name must be string')
];
//# sourceMappingURL=user.validation.js.map