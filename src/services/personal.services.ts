import { Types } from "mongoose";
import { Users } from "../model/user.js";
import { errorResponse, serviceResult } from "../util/response.js";
import { Notifications } from "../model/notification.js";
import { PersonalChats } from "../model/personalChat.js";
import { IPersonalChat } from "../types/chat.type.js";
import { IUser } from "../types/user.type.js";

export async function createFriendRequest(createrId: string, friendId: string) {
  const friend = await Users.findById(friendId);

  if (!friend) {
    return serviceResult(true, "Submit correct friend userId", 403);
  }

  friend.friends.forEach((val) => {
    if (val.equals(createrId)) {
      return serviceResult(true, "Already friend", 400);
    }
  });

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
      id: friend._id,
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

  if (userId.equals(request.to)) {
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

  if (!userId.equals(request.to)) {
    return serviceResult(true, "Please send valid request Id", 404);
  }

  const user = await Users.findById(userId);
  const friend = await Users.findById(request.senderId);

  if (!friend || !user) {
    return serviceResult(true, "something went wrong", 500);
  }

  friend.friends.push(user._id);
  user.friends.push(friend._id);

  await friend.save();
  await user.save();

  return serviceResult(false, "Succesfully accepted", 200, {
    user: {
      id: user._id,
      username: user.username,
    },
    friend: {
      id: friend._id,
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
    to: friendId,
    sender: userId,
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
  const getPersonalMessage = (await PersonalChats.find({
    $or: [
      { sender: userId, receiver: friendId },
      { sender: friendId, receiver: userId },
    ],
  })
    .sort({ createAt: -1 })
    .limit(messagePerPage)
    .skip(skipCount)) as IPersonalChat[];

  if (!getPersonalMessage) {
    return serviceResult(true, "Group is not present", 404);
  }

  return serviceResult(false, "success", 200, getPersonalMessage);
}

export async function getAllFriends(userId: Types.ObjectId) {
  const user = await Users.findById(userId).populate({
    path: "friends",
    select: "-password",
  });

  if (!user) {
    return serviceResult(true, "something went wrong", 500);
  }

  return serviceResult(false, "Success", 200, {
    user: {
      id: user._id,
      username: user.username,
      friends: user.friends,
    },
  });
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
      id: user._id,
      username: user.username,
    },
    friend: {
      id: friend._id,
      username: friend.username,
    },
  });
}
