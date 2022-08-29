import {body} from 'express-validator'

import * as UserService from './user.service';

export const signUpValidationRules: any[] = [
    body('firstName').notEmpty().withMessage('First name is required').bail().isString().withMessage('First name must be string'),
    body('lastName').optional({checkFalsy: true}).isString().withMessage('Last name must be string'),
    body('email').notEmpty().withMessage('Email is required').bail().isEmail().normalizeEmail().withMessage('Invalid email')
    .custom(async (value) =>{
        const user = await UserService.findByEmail(value)
        if(user)  return Promise.reject('E-mail already in use');
    }),
    body('password').notEmpty().withMessage('Password is required').bail().isString().withMessage('Password name must be string')
]

export const signInValidationRules: any[] = [
    body('email').notEmpty().withMessage('Email is required').bail().isEmail().normalizeEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required').bail().isString().withMessage('Password name must be string')
]