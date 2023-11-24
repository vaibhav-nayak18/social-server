import { Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { IUser, UserRequest } from "../types/user.type.js";

export const sendFriendRequest = asyncHandler(
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

export const removeFriend = asyncHandler(
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

export const acceptFriendRequest = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return res.status(403).json({
        isError: true,
        message: "please login",
      });
    }

    const { requestId } = req.body;

    if (!requestId) {
      return res.status(400).json({
        isError: true,
        message: "please send request id",
      });
    }
  },
);

export const declineFriendRequest = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return res.status(403).json({
        isError: true,
        message: "please login",
      });
    }

    const { requestId } = req.body;

    if (!requestId) {
      return res.status(400).json({
        isError: true,
        message: "please send request id",
      });
    }
  },
);
