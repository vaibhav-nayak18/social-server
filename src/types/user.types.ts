import { Schema, Document } from 'mongoose';
import { z as zod } from 'zod';

type Friends = {
    type: Schema.Types.ObjectId;
    ref: string;
};

export interface IUser extends Document {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
    friends: Friends[];
    validatePassword: (userInput: string) => Promise<boolean>;
}

export const signupInput = zod.object({
    firstname: zod.string().min(3, 'firstname should be at least 3 characters'),
    lastname: zod.string().min(1, 'lastname should be at least 3 characters'),
    email: zod.string().email('invalid email format'),
    username: zod.string().min(6, 'username should be at least 6 characters'),
    password: zod
        .string()
        .min(6, 'password is too weak. It should be at least 6 char'),
});

export const loginInput = zod.object({
    username: zod.string().min(6, 'username should be at least 6 characters'),
    password: zod
        .string()
        .min(6, 'password is too weak. It should be at least 6 char'),
});

export const authOutput = zod.object({
    username: zod.string(),
    firstname: zod.string(),
    lastname: zod.string(),
});

export type SignupType = zod.infer<typeof signupInput>;
export type LoginType = zod.infer<typeof loginInput>;
export type AuthOutput = zod.infer<typeof authOutput>;
