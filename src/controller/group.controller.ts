import { Response } from "express";

import { asyncHandler } from "../middleware/asyncHandler.js";
import { IUser, UserRequest } from "../types/user.type.js";
import { validateInput } from "../middleware/validator.js";
import { createGroupType } from "../types/group.type.js";
import { groupSchema, messageSchema } from "../validators/group.schema.js";
import { errorResponse, successResponse } from "../util/response.js";
import {
  createGroup,
  createMessage,
  joinGroup,
  leaveGroup,
  removeFromTheGroup,
} from "../services/group.services.js";

export const createGroupController = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return errorResponse(res, 403, "please login");
    }

    const body = req.body;
    const { isError, message, verifiedData } =
      await validateInput<createGroupType>(body, groupSchema);

    if (isError || !verifiedData) {
      return errorResponse(res, 400, message);
    }

    const {
      errorMessage,
      is_error,
      data: groups,
      statusCode,
    } = await createGroup(verifiedData, user._id);

    if (is_error || !groups) {
      return errorResponse(res, statusCode, errorMessage);
    }

    successResponse(res, groups);
  },
);

export const joinGroupController = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return errorResponse(res, 403, "please login");
    }

    const { groupId } = req.params as {
      groupId: string;
    };

    if (!groupId) {
      return errorResponse(res, 400, "please send group id in url");
    }

    const { is_error, statusCode, errorMessage } = await joinGroup(
      groupId,
      user._id,
    );

    if (!is_error) {
      return errorResponse(res, statusCode, errorMessage);
    }

    successResponse(res);
  },
);

export const leaveGroupController = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return errorResponse(res, 403, "please login");
    }

    const { groupId } = req.params;

    if (!groupId) {
      return errorResponse(res, 400, "please send group id in url");
    }

    const { data, is_error, statusCode, errorMessage } = await leaveGroup(
      groupId,
      user._id,
    );

    if (is_error || !data) {
      return errorResponse(res, statusCode, errorMessage);
    }

    successResponse(res, data, errorMessage);
  },
);

export const removeMemberController = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return errorResponse(res, 403, "please login");
    }
    const { userId } = req.body;

    if (!userId) {
      return errorResponse(res, 400, "please send groupid and id");
    }

    const { errorMessage, statusCode, is_error, data } =
      await removeFromTheGroup(userId, user._id);

    if (is_error || !data) {
      return errorResponse(res, statusCode, errorMessage);
    }

    successResponse(res, data, errorMessage);
  },
);

// TODO: write a query to get 20 message
export const getMessagesController = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return errorResponse(res, 403, "please login");
    }

    const { groupId } = req.params;

    if (!groupId) {
      return errorResponse(res, 400, "please send groupid and id");
    }

    successResponse(res);
  },
);

export const createMessageController = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return errorResponse(res, 403, "please login");
    }

    const { groupId } = req.params;
    const body = req.body as { message: string };

    const { message, isError, verifiedData } = await validateInput<{
      message: string;
    }>(body, messageSchema);

    if (isError || !verifiedData) {
      return errorResponse(res, 403, message);
    }

    if (!groupId) {
      return errorResponse(res, 400, "please send groupid and id");
    }

    const { data, is_error, statusCode, errorMessage } = await createMessage(
      message,
      groupId,
      user._id,
    );

    if (is_error || !data) {
      return errorResponse(res, statusCode, errorMessage);
    }

    successResponse(res, data, errorMessage);
  },
);
