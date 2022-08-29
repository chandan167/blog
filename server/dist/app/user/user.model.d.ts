import { Document, SchemaTimestampsConfig, Model } from 'mongoose';
export interface IUser extends Document, SchemaTimestampsConfig {
    firstName: string;
    lastName?: string | null;
    email: string;
    emailVerifyAt?: Date | null | string;
    phone?: string | null;
    phoneVerifyAt?: Date | null | string;
    isSuperAdmin?: boolean;
    password: string;
}
interface IUserMethods {
    checkPassword: (password: string) => boolean;
}
export declare const User: Model<IUser, {}, IUserMethods, {}, any>;
export {};
//# sourceMappingURL=user.model.d.ts.map