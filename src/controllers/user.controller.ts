import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import {
    IUser,
    LoginType,
    SignupType,
    loginSchema,
    signupSchema,
} from '../types/user.types.js';
import { validateInput } from '../middleware/validator.js';
import {
    authenticateUser,
    createUser,
    findUser,
} from '../services/user.services.js';
import { cookieToken } from '../middleware/cookieToken.js';

export const signup = asyncHandler(async (req: Request, res: Response) => {
    const reqBody = req.body;

    // validate user credentials
    const {
        isError: isInvalidate,
        userInput,
        message: errorMessage,
    } = validateInput<SignupType>(reqBody, signupSchema);

    if (isInvalidate) {
        return res.status(400).json({
            error: true,
            message: errorMessage,
        });
    }

    // Creating user and if user already exist it return the error else it creates
    // the user
    const [isError, { message, statusCode, user }] = (await createUser(
        userInput,
    )) as [boolean, { message: string; statusCode: number; user: IUser }];

    if (isError || !user) {
        return res.status(statusCode).json({
            error: true,
            message,
        });
    }

    // attaching cookie to response
    await cookieToken(user, res);

    res.status(200).json({
        error: false,
        user: {
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            id: user._id,
        },
    });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    const reqBody = req.body;

    // validating the credentials if credentials are not matching with requirements
    // then it return the error
    const {
        isError: isInvalidate,
        userInput,
        message: errorMessage,
    } = validateInput<LoginType>(reqBody, loginSchema);

    if (isInvalidate) {
        return res.status(400).json({
            error: true,
            message: errorMessage,
        });
    }

    // It searches the user in the db and returns the user if it is present in db
    // else it throws an error
    const [isError, { message, statusCode, data: user }] = (await findUser(
        userInput,
    )) as [boolean, { message: string; statusCode: number; data: IUser }];

    if (isError || !user) {
        return res.status(statusCode).json({
            error: true,
            message,
        });
    }

    // attaching cookie to response
    await cookieToken(user, res);

    res.status(200).json({
        error: false,
        user: {
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            id: user._id,
        },
    });
});

export const authenticate = asyncHandler(
    async (req: Request, res: Response) => {
        const token = req.cookies.get('access_token');

        if (!token) {
            return res.status(403).json({
                error: true,
                message: 'Token expired. Please login.',
            });
        }

        const [isError, { message, statusCode, data: user }] =
            (await authenticateUser(token)) as [
                boolean,
                { message: string; statusCode: number; data: IUser },
            ];

        if (isError || !user) {
            return res.status(statusCode).json({
                error: true,
                message,
            });
        }

        res.status(200).json({
            error: false,
            user: {
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                id: user._id,
            },
        });
    },
);
