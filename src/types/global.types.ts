import { objectIdType } from './group.types.js';
import { IUser } from './user.types.js';
import { Request } from 'express';

export interface IRequest extends Request {
    user?: IUser;
    groupId?: objectIdType;
}

export interface IAdminRequest extends IRequest {
    isAdmin?: boolean;
}
