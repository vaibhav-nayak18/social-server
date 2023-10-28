import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { IUser, UserRequest } from '../types/user.type.js';

export const createGroup = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;
  },
);
