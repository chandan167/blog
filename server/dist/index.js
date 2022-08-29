"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const database_1 = require("./config/database");
const PORT = process.env['PORT'] || 3000;
(0, database_1.mongoConnect)().then(() => {
    app_1.server.listen(PORT, () => {
        console.log(`Server is Running on http://localhost:${PORT}`);
        (0, app_1.logRoutes)();
    });
});
//# sourceMappingURL=index.js.map