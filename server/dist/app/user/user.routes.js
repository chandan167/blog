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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const common_1 = require("../../utils/common");
const validate_request_1 = require("../../utils/validate-request");
const auth_middleware_1 = require("../jwt/auth.middleware");
const UserController = __importStar(require("./user.controller"));
const user_validation_1 = require("./user.validation");
const router = (0, express_1.Router)();
router.post('/sign-up', user_validation_1.signUpValidationRules, validate_request_1.validateRequest, (0, common_1.asyncResolver)(UserController.singUp));
router.post('/sign-in', user_validation_1.signInValidationRules, validate_request_1.validateRequest, (0, common_1.asyncResolver)(UserController.singIn));
router.delete('/sign-in', user_validation_1.signInValidationRules, validate_request_1.validateRequest, (0, common_1.asyncResolver)(UserController.singIn));
router.use((0, auth_middleware_1.authMiddleware)());
router.get('/', (0, common_1.asyncResolver)(UserController.usersList));
router.get('/profile', (0, common_1.asyncResolver)(UserController.usersProfile));
router.post('/logout', (0, common_1.asyncResolver)(UserController.logOut));
router.post('/logout-all-devices', (0, common_1.asyncResolver)(UserController.logOutFromAllDevices));
exports.userRouter = (0, express_1.Router)();
exports.userRouter.use('/user', router);
//# sourceMappingURL=user.routes.js.map