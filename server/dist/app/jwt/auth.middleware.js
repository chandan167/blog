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
exports.authMiddleware = void 0;
const UserService = __importStar(require("../user/user.service"));
const common_1 = require("../../utils/common");
const validate_request_1 = require("../../utils/validate-request");
const auth_validation_1 = require("./auth.validation");
const jwt_service_1 = require("./jwt.service");
const authMiddlewareFun = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['x-token'];
    const decoded = yield (0, jwt_service_1.VerifyAuthToken)({
        token: token,
        userAgent: req.headers['user-agent']
    });
    const user = yield UserService.findById(decoded.userId);
    req.auth = {
        user: user,
        tokenData: decoded.tokenData
    };
    next();
});
const authMiddleware = () => {
    return [
        auth_validation_1.AuthTokenValidationRules,
        validate_request_1.validateRequest,
        (0, common_1.asyncResolver)(authMiddlewareFun)
    ];
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map