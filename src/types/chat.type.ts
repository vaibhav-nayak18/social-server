import { Date, Document, Types } from "mongoose";

export interface IGroupChat extends Document {
  groupId: Types.ObjectId;
  sender: Types.ObjectId;
  createAt: Date;
}

export interface IPersonalChat extends Document {
  receiver: Types.ObjectId;
  sender: Types.ObjectId;
  createAt: Date;
}
