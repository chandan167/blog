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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyRefreshToken = exports.VerifyAuthToken = exports.generateJwtToken = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const date_time_1 = require("../../utils/date-time");
const auth_token_model_1 = require("./auth-token.model");
const http_error_1 = require("../../utils/http-error");
const http_status_codes_1 = require("http-status-codes");
const config = {
    algorithm: 'RS256',
    issuer: 'localhost',
    jwtid: process.env['JWT_ID'],
    subject: {
        refreshToken: 'refresh-token',
        authToken: 'auth-token',
    }
};
const privateKey = fs_1.default.readFileSync('private.key');
const publicKey = fs_1.default.readFileSync('public.key');
const generateJwtToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const date = (0, date_time_1.addHours)(10);
    const expireAt = (0, date_time_1.convertDateToSeconds)(date);
    const authToke = generateAuthToken(payload, expireAt);
    const date2 = (0, date_time_1.addDays)(10);
    const refreshToken = generateRefreshToken(payload, (0, date_time_1.convertDateToSeconds)(date2));
    yield auth_token_model_1.AuthToken.create({
        userId: payload.userId,
        userAgent: payload.userAgent,
        authToken: authToke,
        refreshToken: refreshToken,
        issueAt: (0, date_time_1.getTimestampInSeconds)(),
        expireAt: expireAt
    });
    return {
        authToke,
        refreshToken
    };
});
exports.generateJwtToken = generateJwtToken;
const generateAuthToken = (payload, expireAt) => {
    return jsonwebtoken_1.default.sign(Object.assign(Object.assign({}, payload), { currentTime: new Date() }), privateKey, {
        algorithm: config.algorithm,
        expiresIn: expireAt,
        keyid: (0, uuid_1.v4)(),
        issuer: config.issuer,
        subject: config.subject.authToken,
        noTimestamp: false,
        mutatePayload: true,
        jwtid: config.jwtid,
        audience: payload.userAgent
    });
};
const generateRefreshToken = (payload, expireAt) => {
    return jsonwebtoken_1.default.sign(Object.assign(Object.assign({}, payload), { currentTime: new Date() }), privateKey, {
        algorithm: config.algorithm,
        expiresIn: expireAt,
        keyid: (0, uuid_1.v4)(),
        issuer: config.issuer,
        subject: config.subject.refreshToken,
        noTimestamp: false,
        mutatePayload: true,
        jwtid: config.jwtid,
        audience: payload.userAgent
    });
};
const VerifyAuthToken = (verifyOption) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = jsonwebtoken_1.default.verify(verifyOption.token, publicKey, {
            algorithms: [config.algorithm],
            issuer: config.issuer,
            subject: config.subject.authToken,
            jwtid: config.jwtid,
            audience: verifyOption.userAgent
        });
        const tokenData = yield auth_token_model_1.AuthToken.findOne({ authToken: verifyOption.token });
        if (!tokenData)
            throw new http_error_1.ValidationError('Invalid token');
        decoded.tokenData = tokenData;
        return decoded;
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            throw new http_error_1.ValidationError(error.message);
        }
        throw new http_error_1.ValidationError('Invalid token', http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
});
exports.VerifyAuthToken = VerifyAuthToken;
const VerifyRefreshToken = (verifyOption) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.verify(verifyOption.token, publicKey, {
        algorithms: [config.algorithm],
        issuer: config.issuer,
        subject: config.subject.refreshToken,
        jwtid: config.jwtid,
        audience: verifyOption.userAgent
    });
});
exports.VerifyRefreshToken = VerifyRefreshToken;
//# sourceMappingURL=jwt.service.js.map