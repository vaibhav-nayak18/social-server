import { Schema, model, Date } from "mongoose";
import { IPersonalChat } from "../types/chat.type.js";

const personalChatSchema = new Schema<IPersonalChat>({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },

  receiver: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  createAt: {
    type: Date,
    default: Date.now(),
  },
});

export const PersonalChats = model<IPersonalChat>(
  "PersonalChats",
  personalChatSchema,
);
