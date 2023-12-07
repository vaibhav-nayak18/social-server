import { Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { IUser, UserRequest } from "../types/user.type.js";
import { successResponse } from "../util/response.js";

export const getAllNotification = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return res.status(403).json({
        isError: true,
        message: "please login",
      });
    }

    const { friendId } = req.body;

    if (!friendId) {
      return res.status(400).json({
        isError: true,
        message: "please send another user id",
      });
    }
  },
);

export const updateProfile = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return res.status(403).json({
        isError: true,
        message: "please login",
      });
    }

    const { friendId } = req.body;

    if (!friendId) {
      return res.status(400).json({
        isError: true,
        message: "please send another user id",
      });
    }
  },
);

export const deleteUser = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return res.status(403).json({
        isError: true,
        message: "please login",
      });
    }
  },
);
