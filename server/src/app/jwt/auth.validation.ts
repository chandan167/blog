import {header} from 'express-validator'

export const AuthTokenValidationRules: any[] = [
    header('x-token').notEmpty().withMessage('Enter x-token in header').bail(),
]