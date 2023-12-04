import express from "express";

import {
  authenticateUser,
  login,
  register,
} from "../controller/auth.controller.js";

export const authRoute = express.Router();

authRoute.post("/login", login);
authRoute.post("/register", register);
authRoute.get("/authenticate", authenticateUser);
