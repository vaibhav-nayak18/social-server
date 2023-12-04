import express from "express";
import {
  deleteUser,
  getAllNotification,
  getProfile,
  updateProfile,
} from "../controller/user.controller.js";

export const userRoute = express.Router();

// should be users
userRoute.get("/notification", getAllNotification);
userRoute.put("/update", updateProfile);
userRoute.get("/profile", getProfile);

// still need work
userRoute.delete("/delete", deleteUser);
