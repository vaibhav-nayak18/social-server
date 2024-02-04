import { Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { IUser, UserRequest } from "../types/user.type.js";
import { errorResponse, successResponse } from "../util/response.js";
import {
  acceptFriendRequest,
  createFriendRequest,
  createPersonalChat,
  declineFriendRequest,
  getAllFriends,
  getMessage,
  removeFriend,
  getUsers,
} from "../services/personal.services.js";

export const getUsersListController = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return res.status(403).json({
        isError: true,
        message: "please login",
      });
    }

    const { data, is_error, statusCode, errorMessage } = await getUsers(
      user._id,
    );

    if (is_error || !data) {
      return errorResponse(res, statusCode, errorMessage);
    }

    successResponse(res, data, errorMessage);
  },
);

export const sendFriendRequestController = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return res.status(403).json({
        isError: true,
        message: "please login",
      });
    }

    const { friendId } = req.body as { friendId: string };

    if (!friendId || friendId.length !== 24) {
      return res.status(400).json({
        isError: true,
        message: "please send user id",
      });
    }

    const { errorMessage, statusCode, is_error, data } =
      await createFriendRequest(user._id, friendId);

    if (is_error || !data) {
      return errorResponse(res, statusCode, errorMessage);
    }

    successResponse(res, data, errorMessage);
  },
);

export const removeFriendController = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return res.status(403).json({
        isError: true,
        message: "please login",
      });
    }

    const { friendId } = req.params as { friendId: string };

    if (!friendId || friendId.length !== 24) {
      return res.status(400).json({
        isError: true,
        message: "please send another user id",
      });
    }

    const { errorMessage, statusCode, is_error, data } = await removeFriend(
      user._id,
      friendId,
    );

    if (is_error || !data) {
      return errorResponse(res, statusCode, errorMessage);
    }
    successResponse(res, data, errorMessage);
  },
);

export const acceptFriendRequestController = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return res.status(403).json({
        isError: true,
        message: "please login",
      });
    }

    const { requestId } = req.params as { requestId: string };

    if (!requestId || requestId.length != 24) {
      return res.status(400).json({
        isError: true,
        message: "please send request id",
      });
    }

    const { errorMessage, statusCode, is_error, data } =
      await acceptFriendRequest(requestId, user._id);

    if (is_error || !data) {
      return errorResponse(res, statusCode, errorMessage);
    }

    successResponse(res, data, errorMessage);
  },
);

export const declineFriendRequestController = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return res.status(403).json({
        isError: true,
        message: "please login",
      });
    }
    const { requestId } = req.params as { requestId: string };
    if (!requestId || requestId.length != 24) {
      return res.status(400).json({
        isError: true,
        message: "please send invalid request id",
      });
    }

    const { errorMessage, statusCode, is_error, data } =
      await declineFriendRequest(requestId, user._id);

    if (is_error || !data) {
      return errorResponse(res, statusCode, errorMessage);
    }

    successResponse(res, data, errorMessage);
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

    const { message } = req.body as {
      message: string;
    };

    const { friendId } = req.params as {
      friendId: string;
    };

    if (!friendId || friendId.length != 24) {
      return res.status(400).json({
        isError: true,
        message: "please send receiver id",
      });
    }

    if (!message || message.length >= 80) {
      return res.status(400).json({
        isError: true,
        message: "send proper message",
      });
    }

    const { errorMessage, statusCode, is_error, data } =
      await createPersonalChat(user._id, friendId, message);

    if (is_error || !data) {
      return errorResponse(res, statusCode, errorMessage);
    }

    successResponse(res, data, errorMessage);
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

    const { friendId } = req.params as { friendId: string };
    if (!friendId || friendId.length != 24) {
      return errorResponse(res, 403, "please send valid friend id");
    }

    const page = req.query.page as string;
    let pageNum = parseInt(page);

    if (!pageNum) {
      pageNum = 1;
    }

    const messagePerPage = 25;
    const skipCount = (pageNum - 1) * messagePerPage;

    const { errorMessage, data, statusCode, is_error } = await getMessage(
      friendId,
      user._id,
      messagePerPage,
      skipCount,
    );

    if (is_error || !data) {
      return errorResponse(res, statusCode, errorMessage);
    }

    successResponse(res, data, errorMessage);
  },
);

export const getAllFriendsController = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return res.status(403).json({
        isError: true,
        message: "please login",
      });
    }

    const { data, is_error, statusCode, errorMessage } = await getAllFriends(
      user._id,
    );

    if (is_error || !data) {
      return errorResponse(res, statusCode, errorMessage);
    }

    successResponse(res, data, errorMessage);
  },
);
