import { Schema, model } from "mongoose";
import { IGroupChat } from "../types/chat.type.js";

const groupChatSchema = new Schema<IGroupChat>({
  sender: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },

  groupId: {
    type: Schema.Types.ObjectId,
    ref: "Groups",
    required: true,
  },

  createAt: {
    type: Date,
    default: Date.now(),
  },
});

export const GroupChats = model<IGroupChat>("GroupChat", groupChatSchema);
