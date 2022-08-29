import jwt,{TokenExpiredError} from 'jsonwebtoken';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { addDays, addHours, convertDateToSeconds, getTimestampInSeconds } from '../../utils/date-time';
import { AuthToken } from './auth-token.model';
import { ValidationError } from '../../utils/http-error';
import { StatusCodes } from 'http-status-codes';

export interface JwtPayload {
    userId: string;
    userAgent: string|undefined;
    currentTime?: Date;
}



export interface VerifyOption {
    token:string;
    userAgent: string|undefined;
}

const config:any = {
    algorithm : 'RS256',
    issuer: 'localhost',
    jwtid: process.env['JWT_ID'],
    subject: {
        refreshToken: 'refresh-token',
        authToken: 'auth-token',
    }
}

const privateKey = fs.readFileSync('private.key');
const publicKey = fs.readFileSync('public.key');

export const generateJwtToken = async (payload: JwtPayload) => {
    const date = addHours(10);
    const expireAt = convertDateToSeconds(date)
    const authToke = generateAuthToken(payload, expireAt);
    const date2 = addDays(10)
    const refreshToken = generateRefreshToken(payload, convertDateToSeconds(date2));
    await AuthToken.create({
        userId: payload.userId,
        userAgent: payload.userAgent,
        authToken: authToke,
        refreshToken: refreshToken,
        issueAt : getTimestampInSeconds(),
        expireAt: expireAt
    })
    return {
        authToke,
        refreshToken
    }
}

const generateAuthToken = (payload: JwtPayload, expireAt:number) => {
    return jwt.sign({ ...payload, currentTime: new Date() }, privateKey, {
        algorithm: config.algorithm,
        expiresIn: expireAt,
        keyid: uuidv4(),
        issuer: config.issuer,
        subject: config.subject.authToken,
        noTimestamp: false,
        mutatePayload:true,
        jwtid: config.jwtid,
        audience: payload.userAgent
    });
}

const generateRefreshToken = (payload: JwtPayload, expireAt:number) => {
    return jwt.sign({ ...payload, currentTime: new Date() }, privateKey, {
        algorithm: config.algorithm,
        expiresIn: expireAt,
        keyid: uuidv4(),
        issuer: config.issuer,
        subject: config.subject.refreshToken,
        noTimestamp: false,
        mutatePayload:true,
        jwtid: config.jwtid,
        audience: payload.userAgent
    });
}


export const VerifyAuthToken = async (verifyOption:VerifyOption ) =>{
    try{
        const decoded:any =  jwt.verify(verifyOption.token, publicKey, {
            algorithms: [config.algorithm],
            issuer: config.issuer,
            subject: config.subject.authToken,
            jwtid: config.jwtid,
            audience: verifyOption.userAgent
        })
    
        const tokenData = await  AuthToken.findOne({authToken: verifyOption.token});
        if(!tokenData) throw new ValidationError('Invalid token');
        decoded.tokenData = tokenData
        return decoded
    }catch(error:Error|any) {
        if(error instanceof TokenExpiredError){
            throw new ValidationError(error.message)
        }
        throw new ValidationError('Invalid token', StatusCodes.BAD_REQUEST)
    }
    
}

export const VerifyRefreshToken = async (verifyOption:VerifyOption ) =>{
    return jwt.verify(verifyOption.token, publicKey, {
        algorithms: [config.algorithm],
        issuer: config.issuer,
        subject: config.subject.refreshToken,
        jwtid: config.jwtid,
        audience: verifyOption.userAgent
    })
}

