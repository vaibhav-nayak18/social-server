import { CallbackWithoutResultAndOptionalError, Schema, model } from 'mongoose';
import { IUser } from '../types/user.types.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN, ACCESS_TOKEN_EXP } from '../config/env.js';

const userSchema = new Schema<IUser>({
    firstname: {
        type: 'string',
        required: true,
    },

    lastname: {
        type: 'string',
        required: true,
    },

    email: {
        type: 'string',
        required: true,
        unique: true,
    },

    username: {
        type: 'string',
        required: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: 'string',
        required: true,
    },

    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
        },
    ],
});

userSchema.pre(
    'save',
    async function (next: CallbackWithoutResultAndOptionalError) {
        const user = this as IUser;

        if (user.isModified('password')) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash;
        }

        return next();
    },
);

userSchema.methods.validatePassword = async function (
    userInput: string,
): Promise<boolean> {
    const user = this as IUser;

    return await bcrypt.compare(userInput, user.password);
};

userSchema.methods.getAccessToken = async function () {
    return jwt.sign(
        {
            id: this._id,
        },
        ACCESS_TOKEN,
        {
            expiresIn: ACCESS_TOKEN_EXP,
        },
    );
};

export const Users = model<IUser>('Users', userSchema);
