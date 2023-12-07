import express from "express";
import // deleteUser,
// getAllNotification,
// updateProfile,
"../controller/user.controller.js";
import { authenticateUser } from "../controller/auth.controller.js";

export const userRoute = express.Router();

// should be users
userRoute.get("/profile", authenticateUser);

// still need work
// userRoute.delete("/delete", deleteUser);
// userRoute.get("/notification", getAllNotification);
// userRoute.put("/update", updateProfile);
