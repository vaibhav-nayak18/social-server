import { Schema, model } from "mongoose";
import { IGroupChat } from "../types/chat.type.js";

const groupChatSchema = new Schema<IGroupChat>({
  sender: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },

  message: {
    type: String,
    required: true,
  },

  groupId: {
    type: Schema.Types.ObjectId,
    ref: "Groups",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const GroupChats = model<IGroupChat>("GroupChats", groupChatSchema);
