import express from 'express';

import {
  register,
  login,
  isAuth,
  uploadProfilePicture,
} from '../controllers/userController';

export const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/is-auth', isAuth);
userRouter.post('/upload-profile-picture', uploadProfilePicture);
