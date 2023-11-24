import { Response } from "express";

import { asyncHandler } from "../middleware/asyncHandler.js";
import { IUser, UserRequest } from "../types/user.type.js";
import { validateInput } from "../middleware/validator.js";
import { createGroupType } from "../types/group.type.js";
import { groupSchema } from "../validators/group.schema.js";

export const createGroupController = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return res.status(403).json({
        isError: true,
        message: "please login",
      });
    }

    const body = req.body;
    const { isError, message, verifiedData } = validateInput<createGroupType>(
      body,
      groupSchema,
    );

    if (isError || !verifiedData) {
      return res.status(400).json({
        isError,
        message,
      });
    }
  },
);

export const joinGroupController = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return res.status(403).json({
        isError: true,
        message: "please login",
      });
    }

    const { groupId } = req.params as { groupId: string };

    if (!groupId) {
      return res.status(400).json({
        isError: true,
        message: "please send group id in url",
      });
    }
  },
);

export const leaveGroupController = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return res.status(403).json({
        isError: true,
        message: "please login",
      });
    }

    const { groupId } = req.params;

    if (!groupId) {
      return res.status(400).json({
        isError: true,
        message: "please send group id in url",
      });
    }
  },
);

export const removeMemberController = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return res.status(403).json({
        isError: true,
        message: "please login",
      });
    }
    const { groupId } = req.params;
    const { id } = req.body;

    if (!groupId || !id) {
      return res.status(400).json({
        isError: true,
        message: "please send groupid and id",
      });
    }
  },
);

export const getMessagesController = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return res.status(403).json({
        isError: true,
        message: "please login",
      });
    }

    const { groupId } = req.params;

    if (!groupId) {
      return res.status(400).json({
        isError: true,
        message: "please send group id in url",
      });
    }
  },
);
