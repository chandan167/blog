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
exports.logOutFromAllDevices = exports.logOut = exports.usersProfile = exports.usersList = exports.singIn = exports.singUp = void 0;
const http_error_1 = require("../../utils/http-error");
const auth_token_service_1 = require("../jwt/auth-token.service");
const jwt_service_1 = require("../jwt/jwt.service");
const UserService = __importStar(require("./user.service"));
const singUp = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const iUser = req.body;
    const user = yield UserService.createUser(iUser);
    return res.json({
        user: user
    });
});
exports.singUp = singUp;
const singIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield UserService.findByEmail(email);
    if (user && (yield user.checkPassword(password))) {
        const token = yield (0, jwt_service_1.generateJwtToken)({
            userId: user._id,
            userAgent: req.headers['user-agent']
        });
        return res.json({
            token: token
        });
    }
    throw new http_error_1.ValidationError('Invalid email and password');
});
exports.singIn = singIn;
const usersList = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserService.userList();
    return res.json({
        user: users
    });
});
exports.usersList = usersList;
const usersProfile = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = req.auth.user;
    return res.json({
        user: users
    });
});
exports.usersProfile = usersProfile;
const logOut = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    yield req.auth.tokenData.remove();
    return res.json({
        message: "Logout successful"
    });
});
exports.logOut = logOut;
const logOutFromAllDevices = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.auth.user;
    yield (0, auth_token_service_1.deleteAllTokenByUserId)(user._id);
    return res.json({
        message: "Logout successful from all devices"
    });
});
exports.logOutFromAllDevices = logOutFromAllDevices;
//# sourceMappingURL=user.controller.js.map