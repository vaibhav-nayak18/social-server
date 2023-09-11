import { getResult } from '../middleware/errorHandler.js';
import { validateInput } from '../middleware/validator.js';
import { Users } from '../models/user.js';
import { LoginType, SignupType, authOutput } from '../types/user.types.js';

export const createUser = async (
    userInfo: SignupType,
): Promise<
    [boolean, { message: string; statusCode: number; data?: unknown }]
> => {
    const existingUser = await Users.findOne({ username: userInfo.username });

    if (existingUser) {
        return [true, getResult('user aleady exists. Please login', 409)];
    }

    const user = await Users.create({
        username: userInfo.username,
        password: userInfo.password,
        email: userInfo.email,
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
    });

    if (!user) {
        return [true, getResult('server error', 500)];
    }

    const {
        isError,
        message,
        userInput: data,
    } = validateInput(user, authOutput);

    if (isError) {
        return [true, getResult('internal server error', 500)];
    }

    return [isError, getResult(message, 200, data)];
};

export const findUser = async (
    userInfo: LoginType,
): Promise<
    [boolean, { message: string; statusCode: number; data?: unknown }]
> => {
    const { username, password } = userInfo;

    const user = await Users.findOne({ username }).select('+password');

    console.log('user', user);

    if (!user) {
        return [true, getResult('user does not exist', 404)];
    }

    const isPasswordMatch = user.validatePassword(password);

    if (!isPasswordMatch) {
        return [true, getResult('password does not match', 403)];
    }

    const {
        isError,
        message,
        userInput: data,
    } = validateInput(user, authOutput);

    if (isError) {
        return [true, getResult('internal server error', 500)];
    }

    return [isError, getResult(message, 200, data)];
};
