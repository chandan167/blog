import jwt from 'jsonwebtoken';
export interface JwtPayload {
    userId: string;
    userAgent: string | undefined;
    currentTime?: Date;
}
export interface VerifyOption {
    token: string;
    userAgent: string | undefined;
}
export declare const generateJwtToken: (payload: JwtPayload) => Promise<{
    authToke: string;
    refreshToken: string;
}>;
export declare const VerifyAuthToken: (verifyOption: VerifyOption) => Promise<any>;
export declare const VerifyRefreshToken: (verifyOption: VerifyOption) => Promise<string | jwt.JwtPayload>;
//# sourceMappingURL=jwt.service.d.ts.map