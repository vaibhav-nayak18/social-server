import express from 'express';
import { login, signup } from '../controllers/user.controller.js';

export const userRoute = express.Router();

userRoute.post('/signup', signup);
userRoute.post('/login', login);
