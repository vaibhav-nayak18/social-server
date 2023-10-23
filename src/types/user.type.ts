import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  name: string;
  getAccessToken: () => Promise<string>;
}
