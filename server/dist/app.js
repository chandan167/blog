"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRoutes = exports.server = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const console_table_printer_1 = require("console-table-printer");
dotenv_1.default.config();
const http_error_1 = require("./utils/http-error");
const common_1 = require("./utils/common");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
exports.server = (0, http_1.createServer)(app);
app.use(express_1.default.json()).use((0, cors_1.default)()).use((0, morgan_1.default)('dev'))
    .use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1', routes_1.router);
app.use((_req, _res, next) => {
    next(new http_error_1.NotFoundError('Route not found'));
});
app.use(common_1.errorHandler);
const routes = [];
function print(path, layer) {
    if (layer.route) {
        // console.log(layer.route)
        layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))));
    }
    else if (layer.name === 'router' && layer.handle.stack) {
        layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))));
    }
    else if (layer.method && layer.name == '<anonymous>') {
        routes.push({
            method: layer.method.toUpperCase(),
            path: path.concat(split(layer.regexp)).filter(Boolean).join('/')
        });
    }
}
function split(thing) {
    if (typeof thing === 'string') {
        return thing.split('/');
    }
    else if (thing.fast_slash) {
        return '';
    }
    else {
        var match = thing.toString()
            .replace('\\/?', '')
            .replace('(?=\\/|$)', '$')
            .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
        return match
            ? match[1].replace(/\\(.)/g, '$1').split('/')
            : '<complex:' + thing.toString() + '>';
    }
}
function logRoutes() {
    app._router.stack.forEach(print.bind(null, []));
    const p = new console_table_printer_1.Table({
        columns: [
            { name: "method", alignment: "left", color: "cyan" },
            { name: "path", alignment: "left", color: "blue" },
        ],
    });
    p.addRows(routes);
    p.printTable();
}
exports.logRoutes = logRoutes;
//# sourceMappingURL=app.js.map