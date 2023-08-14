import express from 'express';

import { register, login, isAuth } from '../controllers/userController';

export const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/is-auth', isAuth);
