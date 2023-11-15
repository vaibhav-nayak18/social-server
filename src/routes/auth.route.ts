import express from 'express';

import {
  authenticateUser,
  login,
  register,
} from '../controller/auth.controller.js';

export const userRoute = express.Router();

userRoute.post('/login', login);
userRoute.post('/register', register);
userRoute.get('/authenticate', authenticateUser);
