import { getResult } from '../middleware/errorHandler.js';
import { Users } from '../models/user.js';
import { IUser, LoginType, SignupType } from '../types/user.types.js';

export const createUser = async (
    userInfo: SignupType,
): Promise<
    [boolean, { message: string; statusCode: number; data?: unknown }]
> => {
    const existingUser = await Users.findOne({ username: userInfo.username });

    if (existingUser) {
        return [
            true,
            getResult<IUser>('user aleady exists. Please login', 409),
        ];
    }

    const user = await Users.create({
        username: userInfo.username,
        password: userInfo.password,
        email: userInfo.email,
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
    });

    if (!user) {
        return [true, getResult<IUser>('server error', 500)];
    }

    return [false, getResult<IUser>('success', 200, user)];
};

export const findUser = async (
    userInfo: LoginType,
): Promise<
    [boolean, { message: string; statusCode: number; data?: unknown }]
> => {
    const { username, password } = userInfo;

    const user = await Users.findOne({ username }).select('+password');

    if (!user) {
        return [true, getResult<IUser>('user does not exist', 404)];
    }

    const isPasswordMatch = user.validatePassword(password);

    if (!isPasswordMatch) {
        return [true, getResult<IUser>('password does not match', 403)];
    }

    return [false, getResult<IUser>('success', 200, user)];
};

export async function authenticateUser(
    id: string,
): Promise<[boolean, { message: string; statusCode: number; data?: IUser }]> {
    if (!id) {
        return [true, getResult<IUser>('id is required', 404)];
    }
    const user = await Users.findById(id);

    if (!user) {
        return [true, getResult<IUser>('user is not present.', 404)];
    }

    return [false, getResult<IUser>('success', 200, user as IUser)];
}
