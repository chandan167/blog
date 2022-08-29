/// <reference types="node" />
import { Server } from 'http';
declare global {
    namespace Express {
        interface Request {
            auth: Record<any, any>;
        }
    }
}
export declare const server: Server;
export declare function logRoutes(): void;
//# sourceMappingURL=app.d.ts.map