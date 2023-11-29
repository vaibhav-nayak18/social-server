import { Date, Document, Types } from "mongoose";

export interface IGroupChat extends Document {
  message: string;
  groupId: Types.ObjectId;
  sender: Types.ObjectId;
  createAt: Date;
}

export interface IPersonalChat extends Document {
  message: string;
  receiver: Types.ObjectId;
  sender: Types.ObjectId;
  createAt: Date;
}
