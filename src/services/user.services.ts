import { Types } from "mongoose";
import { Notifications } from "../model/notification.js";
import { serviceResult } from "../util/response.js";

export async function getNotification(
  userId: Types.ObjectId,
  skipCount: number,
  page: number,
) {
  const notifications = await Notifications.find({ to: userId })
    .sort({ createdAt: -1 })
    // .skip(skipCount)
    // .limit(page)
    .populate({
      path: "senderId",
      select: "username email",
    });

  if (!notifications) {
    return serviceResult(true, "Please send valid user id", 404);
  }

  return serviceResult(false, "Success", 200, notifications);
}
