import { IUser } from './user.types.js';
import { Request } from 'express';

export interface IRequest extends Request {
    user?: IUser;
}

export interface IAdminRequest extends IRequest {
    isAdmin?: boolean;
    groupId?: string;
}
