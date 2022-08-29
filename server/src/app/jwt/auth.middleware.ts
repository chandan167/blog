import { NextFunction, RequestHandler, Request, Response } from "express";
import * as UserService from '../user/user.service';
import { asyncResolver } from "../../utils/common";
import { validateRequest } from "../../utils/validate-request";
import { AuthTokenValidationRules } from "./auth.validation";
import { VerifyAuthToken } from "./jwt.service";

const authMiddlewareFun = async (req: Request, res: Response, next:NextFunction) =>{
    const token:any = req.headers['x-token'];
    const decoded: any = await VerifyAuthToken({
        token: token,
        userAgent: req.headers['user-agent']
    })
    const user = await UserService.findById(decoded.userId)
    req.auth = {
        user: user,
        tokenData: decoded.tokenData
    }
    next()
}

export const authMiddleware: Function = () => {
    return [
        AuthTokenValidationRules,
        validateRequest,
        asyncResolver(authMiddlewareFun)
    ]
}