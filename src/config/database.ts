import mongoose from "mongoose";
import { MONGODB_URL } from "./env.js";
import { log } from "console";
mongoose.set("strictQuery", true);

export const connectDb = async () => {
  try {
    await mongoose.connect(MONGODB_URL, {});
    log("Database connected successfully");
  } catch (error) {
    log("Db failed to connect. \n error :-", error);
    process.exit(1);
  }
};
