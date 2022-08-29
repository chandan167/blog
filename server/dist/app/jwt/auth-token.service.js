"use strict";
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
exports.deleteAllTokenByUserId = void 0;
const auth_token_model_1 = require("./auth-token.model");
const deleteAllTokenByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield auth_token_model_1.AuthToken.deleteMany({ userId: userId });
});
exports.deleteAllTokenByUserId = deleteAllTokenByUserId;
//# sourceMappingURL=auth-token.service.js.map