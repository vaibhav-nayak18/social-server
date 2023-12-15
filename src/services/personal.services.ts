import { Types } from "mongoose";
import { Users } from "../model/user.js";
import client from "../config/redis.js";
import { log } from "console";
import { serviceResult } from "../util/response.js";
import { Notifications } from "../model/notification.js";

export async function createFriendRequest(createrId: string, friendId: string) {
  const isFriend = await isFriendService(createrId, friendId);

  if (isFriend === "friend") {
    return serviceResult(true, "You both are already friends", 400);
  }

  if (isFriend === "Not user") {
    return serviceResult(true, "Not a user", 403);
  }

  const friend = await Users.findById(friendId);
  if (!friend) {
    return serviceResult(true, "Submit correct friend userId", 403);
  }

  const request = await Notifications.create({
    senderId: createrId,
    to: friendId,
  });

  if (!request) {
    return serviceResult(true, "Something went wrong", 500);
  }

  return serviceResult(
    false,
    "Succesfully created Friend Request",
    200,
    request,
  );
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

  if (userId.equals(request.to)) {
    return serviceResult(true, "Please send valid request Id", 404);
  }
}

export async function createPersonalChat(
  userId: Types.ObjectId,
  friendId: string,
) {}

export async function getAllMessage(userId: Types.ObjectId, friendId: string) {}

export async function getAllFriends(userId: Types.ObjectId) {}

export async function removeFriend(userId: Types.ObjectId, friendId: string) {}

export async function isFriendService(
  userId: string,
  friendId: string,
): Promise<"Not Friend" | "Not user" | "friend"> {
  let friends = await client.sMembers(userId);

  let isFriend = false;
  if (!friends) {
    const user = await Users.findById(userId).select("friends");

    if (!user) {
      return "Not user";
    }
    friends = user.friends.map((val) => {
      if (val.equals(friendId)) {
        isFriend = true;
      }
      return val.toString();
    });
  }

  await client.sAdd(userId, friends);

  if (isFriend) {
    return "friend";
  }

  return "Not Friend";
}
