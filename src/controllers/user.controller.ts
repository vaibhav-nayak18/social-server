import { NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import {
    AuthOutput,
    LoginType,
    SignupType,
    loginInput,
    signupInput,
} from '../types/user.types.js';
import { validateInput } from '../middleware/validator.js';
import { createUser, findUser } from '../services/user.services.js';

/**
 * @route POST / signup
 * @description Create a new user
 * @access public
 *
 * @param { object } req
 * @param {object} res
 *
 *
 * @return { object } An object with cookie and user information
 *
 * @throws {validation Error} If request body is invalid
 * @throws {Error} If something went wrong
 *
 */
// interface IResponse extends Response {
//     error?: (code: number, message: string) => Response;
//     success?: (code: number, message: string, result: unknown) => Response;
// }

export const signup = asyncHandler(async (req: Request, res: Response) => {
    const reqBody = req.body;

    const {
        isError: isInvalidate,
        userInput,
        message: errorMessage,
    } = validateInput(reqBody, signupInput) as {
        isError: boolean;
        userInput: SignupType;
        message: string;
    };

    if (isInvalidate) {
        return res.status(400).json({
            error: true,
            message: errorMessage,
        });
    }

    const [isError, { message, statusCode, data }] = (await createUser(
        userInput,
    )) as [boolean, { message: string; statusCode: number; data?: AuthOutput }];

    if (isError || !data) {
        return res.status(statusCode).json({
            error: true,
            message,
        });
    }

    res.status(200).json({
        error: false,
        data,
    });
});

/**
 * @route POST / login
 * @description Verify existing user
 * @access public
 *
 * @param { object } req
 * @param {object} res
 *
 *
 * @return { object } An object with cookie and user information
 *
 * @throws {validation Error} If request body is invalid
 * @throws {Error} If something went wrong
 *
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
    const reqBody = req.body;

    const {
        isError: isInvalidate,
        userInput,
        message: errorMessage,
    } = validateInput(reqBody, loginInput) as {
        isError: boolean;
        userInput: LoginType;
        message: string;
    };

    if (isInvalidate) {
        return res.status(400).json({
            error: true,
            message: errorMessage,
        });
    }

    const [isError, { message, statusCode, data }] = (await findUser(
        userInput,
    )) as [boolean, { message: string; statusCode: number; data?: AuthOutput }];

    if (isError || !data) {
        return res.status(statusCode).json({
            error: true,
            message,
        });
    }

    res.status(200).json({
        error: false,
        data,
    });
});
