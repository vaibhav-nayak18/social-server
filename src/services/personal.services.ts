import { Types } from "mongoose";
import { Users } from "../model/user.js";
import { serviceResult } from "../util/response.js";
import { Notifications } from "../model/notification.js";
import { PersonalChats } from "../model/personalChat.js";
import { IPersonalChat } from "../types/chat.type.js";
import { IUser } from "../types/user.type.js";
import { log } from "console";

export async function getAllUsers(userId: Types.ObjectId) {
  const user = await Users.findById(userId).populate("friends", "_id");

  if (!user) {
    return serviceResult(true, "Invalid userId", 404);
  }

  const friends = user.friends.map((val) => val._id);

  const nonFriends = await Users.find(
    { _id: { $nin: [...friends, userId] } },
    "username _id",
  );

  if (!nonFriends) {
    return serviceResult(true, "Internal Error", 500);
  }

  return serviceResult(false, "success", 200, {
    users: nonFriends,
  });
}

async function isFriendRequestExit(
  createrId: string,
  friendId: string,
): Promise<boolean> {
  const request = await Notifications.findOne({
    $or: [
      { to: createrId, senderId: friendId },
      { to: friendId, senderId: createrId },
    ],
  });
  return !!request;
}

export async function createFriendRequest(createrId: string, friendId: string) {
  if (createrId === friendId) {
    return serviceResult(
      true,
      "You can not send friend request to your self",
      403,
    );
  }
  const friend = await Users.findById(friendId);

  if (!friend) {
    return serviceResult(true, "Submit correct friend userId", 403);
  }

  if (await isFriendRequestExit(friendId, createrId)) {
    return serviceResult(
      true,
      "Friend request Already exit. please check the notification.",
      401,
    );
  }

  let isAlreadyFriend = false;

  friend.friends.forEach((val) => {
    if (val.equals(createrId)) {
      isAlreadyFriend = true;
    }
  });

  if (isAlreadyFriend) {
    return serviceResult(true, "Already friend", 400);
  }

  const request = await Notifications.create({
    senderId: createrId,
    to: friendId,
  });

  if (!request) {
    return serviceResult(true, "Something went wrong", 500);
  }

  return serviceResult(false, "Succesfully created Friend Request", 200, {
    request,
    friend: {
      _id: friend._id,
      username: friend.username,
    },
  });
}

export async function declineFriendRequest(
  requestId: string,
  userId: Types.ObjectId,
) {
  const request = await Notifications.findById(requestId);
  if (!request) {
    return serviceResult(true, "Please send valid request Id", 404);
  }

  if (!request.to.equals(userId)) {
    return serviceResult(true, "Please send valid request Id", 404);
  }

  await Notifications.findByIdAndDelete(requestId);

  return serviceResult(false, "Succesfully declined", 200, request);
}

export async function acceptFriendRequest(
  requestId: string,
  userId: Types.ObjectId,
) {
  const request = await Notifications.findById(requestId);
  if (!request) {
    return serviceResult(true, "Please send valid request Id", 404);
  }
  if (!request.to.equals(userId)) {
    return serviceResult(true, "Please send valid request Id", 404);
  }

  const user = await Users.findById(userId);
  const friend = await Users.findById(request.senderId);

  if (!friend || !user) {
    return serviceResult(true, "something went wrong", 500);
  }

  friend.friends.push(user._id);
  user.friends.push(friend._id);

  await Promise.all([
    friend.save(),
    user.save(),
    Notifications.findOneAndDelete({ _id: request._id }),
  ]);

  return serviceResult(false, "Succesfully accepted", 200, {
    user: {
      _id: user._id,
      username: user.username,
    },
    friend: {
      _id: friend._id,
      username: friend.username,
    },
  });
}

export async function createPersonalChat(
  userId: Types.ObjectId,
  friendId: string,
  chatMessage: string,
) {
  const message = await PersonalChats.create({
    message: chatMessage,
    sender: userId,
    receiver: friendId,
  });

  await message?.populate({
    path: "sender",
    select: "_id username",
  });

  if (!message) {
    return serviceResult(true, "Something went wrong", 500);
  }

  return serviceResult(false, "message sent Succesfully", 200, message);
}

export async function getMessage(
  friendId: string,
  userId: Types.ObjectId,
  messagePerPage: number,
  skipCount: number,
) {
  const getPersonalMessage = await PersonalChats.find({
    $or: [
      { sender: userId, receiver: friendId },
      { sender: friendId, receiver: userId },
    ],
  })
    .sort({ createdAt: -1 })
    .populate({ path: "sender", select: "_id username" });
  // .skip(skipCount)
  // .limit(messagePerPage);

  log(getPersonalMessage);

  if (!getPersonalMessage) {
    return serviceResult(true, "Group is not present", 404);
  }

  return serviceResult(false, "success", 200, getPersonalMessage);
}

export async function getAllFriends(userId: Types.ObjectId) {
  const user = await Users.findById(userId).populate({
    path: "friends",
    select: "-password -email -notifications -groups -friends",
  });

  if (!user) {
    return serviceResult(true, "something went wrong", 500);
  }

  return serviceResult(false, "Success", 200, {
    friends: user.friends,
  });
}

export async function getUsers(userId: Types.ObjectId) {
  const users = await Users.find({
    _id: { $ne: userId },
    friends: { $nin: [userId] },
  })
    .select("_id username")
    .exec();

  if (!users) {
    return serviceResult(true, "Something went wrong", 500);
  }

  return serviceResult(false, "Success", 200, users);
}

export async function removeFriend(userId: Types.ObjectId, friendId: string) {
  const user = (await Users.findById(userId)) as IUser;
  const friend = (await Users.findById(friendId)) as IUser;

  if (!friend || !user) {
    return serviceResult(true, "something went wrong", 500);
  }

  friend.friends = friend.friends.filter((val) => {
    return !val.equals(user._id);
  });

  user.friends = user.friends.filter((val) => {
    return !val.equals(friend._id);
  });

  await friend.save();
  await user.save();

  return serviceResult(true, "Succesfully removed from the friend list", 200, {
    user: {
      _id: user._id,
      username: user.username,
    },
    friend: {
      _id: friend._id,
      username: friend.username,
    },
  });
}
