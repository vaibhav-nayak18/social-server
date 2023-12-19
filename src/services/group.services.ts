import { Types, ObjectId } from "mongoose";

import { Groups } from "../model/group.js";
import { IGroup, createGroupType } from "../types/group.type.js";
import { errorResponse, serviceResult } from "../util/response.js";
import { Users } from "../model/user.js";
import { IUser } from "../types/user.type.js";
import { GroupChats } from "../model/groupChat.js";
import { IGroupChat } from "../types/chat.type.js";
import { log } from "console";

export async function createGroup(
  userInput: createGroupType,
  userId: Types.ObjectId,
) {
  const isGroupExist = (await Groups.findOne({
    name: userInput.group_name,
  })) as IGroup;

  if (isGroupExist) {
    return serviceResult(
      true,
      `Try different group name. ${userInput.group_name} already exist `,
      403,
    );
  }

  const groups = (await Groups.create({
    name: userInput.group_name,
    category: userInput.category,
    admin: userId,
  })) as IGroup;

  if (!groups) {
    return serviceResult(true, "Groups does not exist", 500);
  }

  return serviceResult(false, "Group created successfully.", 200, groups);
}

export async function joinGroup(groupId: string, userId: Types.ObjectId) {
  let groups = (await Groups.findById(groupId)) as IGroup;
  if (!groups) {
    return serviceResult(true, "groups is not present", 404);
  }

  let isExist = false;
  if (groups.admin.equals(userId)) {
    isExist = true;
  }

  groups.users.forEach((val) => {
    if (val && val.equals(userId)) {
      isExist = true;
    }
  });

  if (isExist) {
    return serviceResult(true, "User already exist in the group", 401);
  }
  groups.users.push(userId);
  groups = await groups.save();

  if (!groups) {
    return serviceResult(
      true,
      "something went wrong with server. please try again",
      500,
    );
  }

  return serviceResult(false, "successfully joined the group", 200);
}

export async function leaveGroup(groupId: string, userId: Types.ObjectId) {
  let groups = (await Groups.findById(groupId)) as IGroup;

  if (!groups) {
    return serviceResult(true, "groups is not present", 404);
  }

  let isPresent = false;

  groups.users = groups.users.filter((val) => {
    if (val) {
      if (val.equals(userId)) {
        isPresent = true;
      }
      return !val.equals(userId);
    }

    return false;
  });

  if (!isPresent) {
    return serviceResult(true, "You are not a part of the group", 403);
  }

  groups = await groups.save();

  if (!groups) {
    return serviceResult(
      true,
      "something went wrong with server. please try again",
      500,
    );
  }

  return serviceResult(false, "successfully left the group", 200, {});
}

export async function removeFromTheGroup(
  removeId: string,
  userId: Types.ObjectId,
  groupId: string,
) {
  let groups = (await Groups.findById(groupId)) as IGroup;

  if (!groups) {
    return serviceResult(true, "Admin can only kickout groups memebers", 404);
  }

  if (!groups.admin.equals(userId)) {
    return serviceResult(true, "Admin can only kickout groups memebers", 404);
  }

  let removedUserId;

  let id = new Types.ObjectId(removeId);
  groups.users = groups.users.filter((val) => {
    if (val.equals(id)) {
      removedUserId = val;
    }
    return !val.equals(id);
  });

  let removedUser = (await Users.findById(removedUserId)) as IUser;

  if (!removedUser) {
    return serviceResult(true, "user does not exit in this group", 404);
  }
  groups = await groups.save();

  if (!groups) {
    return serviceResult(
      true,
      "something went wrong with server. please try again",
      500,
    );
  }

  return serviceResult(
    false,
    "successfully removed The user the group",
    200,
    groups,
  );
}

export async function getGroup(groupId: string, userId: Types.ObjectId) {
  const group = (await Groups.findById(groupId)) as IGroup;

  let isUserExits = false;

  if (group.admin.equals(userId)) {
    isUserExits = true;
  }

  group.users.forEach((val) => {
    if (val.equals(userId)) {
      isUserExits = true;
    }
  });

  if (!isUserExits) {
    return serviceResult(true, "Groups is not present", 403);
  }

  return serviceResult(false, "success", 200, group);
}

export async function createMessage(
  message: string,
  groupId: string,
  userId: Types.ObjectId,
) {
  let groups = (await Groups.findById(groupId)) as IGroup;
  if (!groups) {
    return serviceResult(true, "Group id is invalid", 404);
  }

  let groupChat = (await GroupChats.create({
    groupId,
    sender: userId,
    message,
  })) as IGroupChat;

  if (!groupChat) {
    return serviceResult(
      true,
      "something went wrong please send this message again",
      500,
    );
  }

  return serviceResult(false, "message sent", 200, GroupChats);
}

export async function groupAdmin(groupId: string, userId: Types.ObjectId) {
  let groups = await Groups.findById(groupId);

  if (!groups) {
    return serviceResult(true, "group id is invalid", 404);
  }

  if (groups.admin === userId) {
    return serviceResult(false, "This user is group admin", 200);
  }

  return serviceResult(true, "You are not Group admin.", 403);
}

export async function getAllGroups() {
  let groups = await Groups.find({});

  if (!groups) {
    return serviceResult(true, "something went wrong", 500);
  }

  return serviceResult(false, "success", 200, groups);
}

export async function getChats(
  groupId: string,
  messagePerPage: number,
  skipCount: number,
) {
  const groupChats = (await GroupChats.find({ groupId })
    .sort({ createAt: -1 })
    .limit(messagePerPage)
    .skip(skipCount)) as IGroupChat[];

  if (!groupChats) {
    return serviceResult(true, "Group is not present", 404);
  }

  return serviceResult(false, "success", 200, groupChats);
}

export async function deleteGroup(groupId: string, adminId: Types.ObjectId) {
  let group = (await Groups.findById(groupId)) as IGroup;

  let isAdmin = false;

  if (!group) {
    return serviceResult(true, "Group is not present. ", 500);
  }

  if (group.admin.equals(adminId)) {
    isAdmin = true;
  }

  if (!isAdmin) {
    return serviceResult(true, "Only admin has this privillage", 401);
  }

  group = await group.deleteOne();

  if (!group) {
    return serviceResult(true, "Please try agian later", 500);
  }

  return serviceResult(
    false,
    `successfully deleted ${group.name} `,
    200,
    group,
  );
}
