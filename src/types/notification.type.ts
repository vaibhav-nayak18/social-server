import { Document, Types } from "mongoose";

export interface INotification extends Document {
  senderId: Types.ObjectId;
  to: Types.ObjectId;
  createdAt: Date;
}
