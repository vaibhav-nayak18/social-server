import express from "express";
import {
  deleteUser,
  getAllNotification,
  updateProfile,
} from "../controller/user.controller.js";

export const userRoute = express.Router();

// should be users
userRoute.get("/notification", getAllNotification);
userRoute.put("/update", updateProfile);

// still need work
userRoute.delete("/delete", deleteUser);
