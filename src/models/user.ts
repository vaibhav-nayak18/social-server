import { CallbackWithoutResultAndOptionalError, Schema, model } from 'mongoose';
import { IUser } from '../types/user.types.js';
import bcrypt from 'bcrypt';

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
            ref: 'User',
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

export const Users = model<IUser>('Users', userSchema);
