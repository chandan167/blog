import {Router} from 'express'
import { userRouter } from './app/user/user.routes';

export const router:Router = Router();

router.use(userRouter)