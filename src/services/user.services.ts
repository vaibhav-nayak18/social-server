import { getResult } from '../middleware/errorHandler.js';
import { Users } from '../models/user.js';
import { LoginType, SignupType } from '../types/user.types.js';

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

    return [false, getResult('success', 200, user)];
};

export const findUser = async (
    userInfo: LoginType,
): Promise<
    [boolean, { message: string; statusCode: number; data?: unknown }]
> => {
    const { username, password } = userInfo;

    const user = await Users.findOne({ username }).select('+password');

    if (!user) {
        return [true, getResult('user does not exist', 404)];
    }

    const isPasswordMatch = user.validatePassword(password);

    if (!isPasswordMatch) {
        return [true, getResult('password does not match', 403)];
    }

    return [false, getResult('success', 200, user)];
};

export async function authenticateUser(
    id: string,
): Promise<[boolean, { message: string; statusCode: number; data?: unknown }]> {
    if (!id) {
        return [true, getResult('id is required', 404)];
    }
    const user = await Users.findById(id);

    if (!user) {
        return [true, getResult('user is not present.', 404)];
    }
    console.log(user._id);

    return [false, getResult('success', 200, user)];
}
