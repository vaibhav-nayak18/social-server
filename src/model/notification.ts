import { Schema, model } from "mongoose";
import { INotification } from "../types/notification.type.js";

const notificationSchema = new Schema<INotification>({
  validateString: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  senderId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

export const Notifications = model<INotification>(
  "Notifications",
  notificationSchema,
);
