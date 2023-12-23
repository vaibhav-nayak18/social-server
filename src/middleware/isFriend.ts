import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "./asyncHandler.js";
import { UserRequest } from "../types/user.type.js";
import { errorResponse } from "../util/response.js";
import { Users } from "../model/user.js";

export const isFriend = asyncHandler(
  async (req: UserRequest, res: Response, next: NextFunction) => {
    const user = await Users.findById(req.user?._id);
    const { friendId } = req.params;

    if (!user) {
      return errorResponse(res, 404, "Please login");
    }

    if (!friendId || friendId.length != 24) {
      return errorResponse(res, 403, "Invalid friend Id");
    }

    let isAlreadyFriend = false;

    user.friends.forEach((val) => {
      if (val.equals(friendId)) {
        isAlreadyFriend = true;
      }
    });

    if (isAlreadyFriend) {
      return next();
    }
    return errorResponse(res, 404, "Please send a friend request");
  },
);
