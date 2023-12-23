import { Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { IUser, UserRequest } from "../types/user.type.js";
import { errorResponse, successResponse } from "../util/response.js";
import { getNotification } from "../services/user.services.js";

export const getAllNotificationController = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return res.status(403).json({
        isError: true,
        message: "please login",
      });
    }

    const page = req.query.page as string;
    let pageNum = parseInt(page);

    if (!pageNum) {
      pageNum = 1;
    }
    const messagePerPage = 25;
    const skipCount = (pageNum - 1) * messagePerPage;

    const { data, is_error, statusCode, errorMessage } = await getNotification(
      user._id,
      skipCount,
      messagePerPage,
    );

    if (is_error || !data) {
      return errorResponse(res, statusCode, errorMessage);
    }

    return successResponse(res, data, errorMessage);
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
