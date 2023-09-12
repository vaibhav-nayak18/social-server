import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { asyncHandler } from './asyncHandler.js';
import { authenticateUser } from '../services/user.services.js';
import { IUser } from '../types/user.types.js';
import { IRequest } from '../types/global.types.js';

export const authorize = asyncHandler(
    async (req: IRequest, res: Response, next: NextFunction) => {
        const token =
            req.headers['authorization']?.replace('Bearer ', '') ||
            req.cookies?.access_token;

        if (!token) {
            return res.status(403).json({
                error: true,
                message: 'Please login',
            });
        }

        const payload = jwt.decode(token) as { id: string };

        if (!payload) {
            return res.status(404).json({
                error: true,
                message: 'invalid token',
            });
        }

        const [isError, { message, statusCode, data: user }] =
            await authenticateUser(payload.id);

        if (!user) {
            return res.status(statusCode).json({
                error: isError,
                message,
            });
        }

        req.user = user as IUser;

        next();
    },
);
