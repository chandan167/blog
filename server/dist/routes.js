"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_routes_1 = require("./app/user/user.routes");
exports.router = (0, express_1.Router)();
exports.router.use(user_routes_1.userRouter);
//# sourceMappingURL=routes.js.map