import { NextFunction, Response } from "express";
import { IUser, UserRequest } from "../types/user.type.js";
import { asyncHandler } from "./asyncHandler.js";
import { errorResponse } from "../util/response.js";
import { groupAdmin } from "../services/group.services.js";

export const isGroupAdmin = asyncHandler(
  async (req: UserRequest, res: Response, next: NextFunction) => {
    const user = req.user as IUser;

    if (!user) {
      return errorResponse(res, 401, "login please");
    }

    const { id: groupId } = req.params as { id: string };

    if (!groupId) {
      return errorResponse(res, 404, "group id is not present.");
    }

    const { is_error, errorMessage } = await groupAdmin(groupId, user._id);

    if (is_error) {
      return errorResponse(res, 401, errorMessage);
    }

    next();
  },
);
