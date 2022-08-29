import { NextFunction, Request, RequestHandler, Response, Send } from "express";
import { ValidationError } from "../../utils/http-error";
import { deleteAllTokenByUserId } from "../jwt/auth-token.service";
import { generateJwtToken } from "../jwt/jwt.service";
import { IUser } from "./user.model";
import * as UserService from './user.service';


export const singUp: RequestHandler = async (req:Request,res:Response,_next: NextFunction):Promise<Response> =>{
    const iUser: IUser = req.body;
    const user = await  UserService.createUser(iUser);
    return res.json({
        user:user
    });
}


export const singIn: RequestHandler = async (req: Request, res:Response, next:NextFunction): Promise<Response> =>{
    const { email, password} = req.body;
    const user = await UserService.findByEmail(email);
    if(user && await user.checkPassword(password)){
        const token = await generateJwtToken({
            userId: user._id,
            userAgent: req.headers['user-agent']
        })
        return res.json({
            token: token
        })
    }
    throw new ValidationError('Invalid email and password');
}


export const usersList: RequestHandler = async (req:Request,res:Response,_next: NextFunction):Promise<Response> =>{
    const users = await  UserService.userList();
    return res.json({
        user:users
    });
}


export const usersProfile: RequestHandler = async (req:Request,res:Response,_next: NextFunction):Promise<Response> =>{
    const users = req.auth.user
    return res.json({
        user:users
    });
}

export const logOut: RequestHandler = async (req:Request,res:Response,_next: NextFunction):Promise<Response> =>{
    await req.auth.tokenData.remove()
    return res.json({
        message: "Logout successful"
    });
}


export const logOutFromAllDevices: RequestHandler = async (req:Request,res:Response,_next: NextFunction):Promise<Response> =>{
    const user = req.auth.user;
    await deleteAllTokenByUserId(user._id);
    return res.json({
        message: "Logout successful from all devices"
    });
}