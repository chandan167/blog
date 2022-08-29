import {Router} from 'express';
import {asyncResolver} from '../../utils/common';
import { validateRequest } from '../../utils/validate-request';
import { authMiddleware } from '../jwt/auth.middleware';

import * as UserController from './user.controller';
import { signInValidationRules, signUpValidationRules } from './user.validation';

const router:Router = Router();

router.post('/sign-up', signUpValidationRules, validateRequest, asyncResolver(UserController.singUp));
router.post('/sign-in', signInValidationRules, validateRequest, asyncResolver(UserController.singIn));
router.use(authMiddleware())
router.get('/', asyncResolver(UserController.usersList));
router.get('/profile', asyncResolver(UserController.usersProfile));
router.post('/logout', asyncResolver(UserController.logOut));
router.post('/logout-all-devices', asyncResolver(UserController.logOutFromAllDevices));

export const userRouter:Router = Router();
userRouter.use('/user', router); 