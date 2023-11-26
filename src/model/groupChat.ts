import { Schema, model } from "mongoose";
import { IGroupChat } from "../types/chat.type.js";

const groupChatSchema = new Schema<IGroupChat>({
  sender: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  groupId: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  createAt: {
    type: Date,
    default: Date.now(),
  },
});

export const GroupChats = model<IGroupChat>("GroupChat", groupChatSchema);
