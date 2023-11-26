import { Document, Types } from "mongoose";

export interface INotification extends Document {
  type: "group" | "personal";
  validateString: string;
  senderId: Types.ObjectId;
}
