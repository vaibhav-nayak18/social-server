import { Response } from 'express';

import { asyncHandler } from '../middleware/asyncHandler.js';
import { IUser, UserRequest } from '../types/user.type.js';

export const createGroupController = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;
  },
);

export const joinGroupController = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;
  },
);

export const leaveGroupController = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;
  },
);

export const removeMemberController = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;
  },
);

export const getMessagesController = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;
  },
);
