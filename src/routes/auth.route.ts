import express from "express";
import { login } from "../controller/auth.controller.js";

export const userRoute = express.Router();

userRoute.post("/login", login);
