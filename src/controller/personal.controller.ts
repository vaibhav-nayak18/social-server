import { Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { IUser, UserRequest } from "../types/user.type.js";
import { successResponse } from "../util/response.js";

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
    successResponse(res);
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
    successResponse(res);
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
    successResponse(res);
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
    successResponse(res);
  },
);

export const getNotification = asyncHandler(
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
    successResponse(res);
  },
);

export const sendMessage = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return res.status(403).json({
        isError: true,
        message: "please login",
      });
    }

    const { message, receiver } = req.body;

    if (!receiver) {
      return res.status(400).json({
        isError: true,
        message: "please send receiver id",
      });
    }

    if (!message) {
      return res.status(400).json({
        isError: true,
        message: "message can not be empty",
      });
    }
    successResponse(res);
  },
);

export const getPersonalMessage = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return res.status(403).json({
        isError: true,
        message: "please login",
      });
    }

    successResponse(res);
  },
);
