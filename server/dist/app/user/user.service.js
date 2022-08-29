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
exports.findById = exports.findByEmail = exports.userList = exports.createUser = void 0;
const user_model_1 = require("./user.model");
const createUser = (iUser) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.create(iUser);
});
exports.createUser = createUser;
const userList = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.find();
});
exports.userList = userList;
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findOne({ email: email });
});
exports.findByEmail = findByEmail;
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findById(id);
});
exports.findById = findById;
//# sourceMappingURL=user.service.js.map