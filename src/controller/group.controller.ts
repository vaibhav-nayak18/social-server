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
  deleteGroup,
  getAllGroups,
  getChats,
  getGroup,
  joinGroup,
  leaveGroup,
  removeFromTheGroup,
} from "../services/group.services.js";
import { log } from "console";

export const createGroupController = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user._id) {
      return errorResponse(res, 403, "please login");
    }

    const body = req.body as createGroupType;
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

    if (!groupId || groupId.length != 24) {
      return errorResponse(res, 400, "please send groupid and id");
    }

    const { is_error, statusCode, errorMessage } = await joinGroup(
      groupId,
      user._id,
    );

    if (is_error) {
      return errorResponse(res, statusCode, errorMessage);
    }

    successResponse(res, {}, errorMessage);
  },
);

export const leaveGroupController = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return errorResponse(res, 403, "please login");
    }

    const { groupId } = req.params;

    if (!groupId || groupId.length != 24) {
      return errorResponse(res, 400, "please send groupid and id");
    }

    const { data, is_error, statusCode, errorMessage } = await leaveGroup(
      groupId,
      user._id,
    );

    if (is_error || !data) {
      return errorResponse(res, statusCode, errorMessage);
    }
    log("hello", is_error);

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

    const { groupId } = req.params;

    if (!groupId || groupId.length != 24) {
      return errorResponse(res, 400, "please send groupid and id");
    }

    if (!userId || userId.length != 24) {
      return errorResponse(res, 400, "please send user id in body");
    }

    const { errorMessage, statusCode, is_error, data } =
      await removeFromTheGroup(userId, user._id, groupId);

    if (is_error || !data) {
      return errorResponse(res, statusCode, errorMessage);
    }

    successResponse(res, data, errorMessage);
  },
);

export const getMessagesController = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return errorResponse(res, 403, "please login");
    }

    const { groupId } = req.params;

    const page = req.query.page as string;
    let pageNum = parseInt(page);

    if (!pageNum) {
      pageNum = 1;
    }

    if (!groupId || groupId.length != 24) {
      return errorResponse(res, 400, "please send groupid and id");
    }

    const messagePerPage = 25;
    const skipCount = (pageNum - 1) * messagePerPage;
    const { data, is_error, statusCode, errorMessage } = await getChats(
      groupId,
      messagePerPage,
      skipCount,
      user._id,
    );
    if (is_error || !data) {
      return errorResponse(res, statusCode, errorMessage);
    }

    successResponse(res, data);
  },
);

export const getAllGroupsController = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return errorResponse(res, 403, "please login");
    }

    const { data, is_error, statusCode, errorMessage } = await getAllGroups();

    if (is_error || !data) {
      return errorResponse(res, statusCode, errorMessage);
    }

    successResponse(res, data, errorMessage);
  },
);

export const deleteGroupsController = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return errorResponse(res, 403, "please login");
    }

    const { groupId } = req.params;
    if (!groupId || groupId.length != 24) {
      return errorResponse(res, 403, "Group is not present");
    }

    const { data, is_error, statusCode, errorMessage } = await deleteGroup(
      groupId,
      user._id,
    );

    if (is_error || !data) {
      return errorResponse(res, statusCode, errorMessage);
    }

    successResponse(res, data, errorMessage);
  },
);

export const sendGroupMessage = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return errorResponse(res, 403, "please login");
    }

    const { groupId } = req.params;
    if (!groupId || groupId.length != 24) {
      return errorResponse(res, 403, "Group is not present");
    }

    const body = req.body;

    const { message, isError, verifiedData } = await validateInput<{
      message: string;
    }>(body, messageSchema);

    if (isError || !verifiedData) {
      return res.status(400).json({
        message,
        isError,
      });
    }

    const { data, is_error, statusCode, errorMessage } = await createMessage(
      verifiedData.message,
      groupId,
      user._id,
    );

    if (is_error || !data) {
      return errorResponse(res, statusCode, errorMessage);
    }

    successResponse(res, data, errorMessage);
  },
);

export const getSingleGroupController = asyncHandler(
  async (req: UserRequest, res: Response) => {
    const user = req.user as IUser;

    if (!user) {
      return errorResponse(res, 403, "please login");
    }

    const { groupId } = req.params;
    if (!groupId || groupId.length != 24) {
      return errorResponse(res, 403, "Group is not present");
    }

    const { data, is_error, statusCode, errorMessage } = await getGroup(
      groupId,
      user._id,
    );

    if (is_error || !data) {
      return errorResponse(res, statusCode, errorMessage);
    }

    successResponse(res, data, errorMessage);
  },
);
