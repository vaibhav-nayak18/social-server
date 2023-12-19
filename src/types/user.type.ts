import { Document, Types } from "mongoose";
import * as z from "zod";
import { Request } from "express";
import { loginSchema, registerSchema } from "../validators/user.schema.js";
export interface IUser extends Document {
  username: string;
  password?: string;
  email: string;
  notifications: Types.ObjectId[];
  friends: Types.ObjectId[];
  groups: Types.ObjectId[];
  validatePassword: (userInput: string) => Promise<boolean>;
  getAccessToken: () => Promise<string>;
}

export type loginType = z.infer<typeof loginSchema>;
export type registerType = z.infer<typeof registerSchema>;

export interface UserRequest extends Request {
  user?: {
    _id: string;
    email: string;
    username: string;
  };
}
