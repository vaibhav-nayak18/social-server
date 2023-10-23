import mongoose from "mongoose";
import { MONGODB_URL } from "./env.js";
mongoose.set("strictQuery", true);

export const connectDb = async () => {
  try {
    await mongoose.connect(MONGODB_URL, {});
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Db failed to connect. \n error :-", error);
    process.exit(1);
  }
};
