import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "./asyncHandler.js";
import jwt from "jsonwebtoken";
// import redis from "../config/redis.js";
import { UserRequest } from "../types/user.type.js";
import { getUserById } from "../services/auth.services.js";
import { log } from "console";

export const authorizationUser = asyncHandler(
  async (req: UserRequest, res: Response, next: NextFunction) => {
    const token =
      req.cookies?.access_token ||
      req.headers["authorization"]?.replace("Bearer ", "");

    if (!token) {
      return res.status(403).json({
        isError: true,
        message: "please login",
      });
    }

    const payload = jwt.decode(token) as { id: string };

    if (!payload || !payload.id) {
      return res.status(403).json({
        isError: true,
        message: "please login again",
      });
    }
    //
    // const cacheUser = await redis.get(`user:${payload.id}`);
    //
    // if (cacheUser) {
    //   const user = JSON.parse(cacheUser) as {
    //     _id: string;
    //     email: string;
    //     username: string;
    //   };
    //
    //   req.user = user;
    //   log("user", req.user);
    //   return next();
    // }

    const { data: user, is_Error, statusCode } = await getUserById(payload.id);

    if (is_Error || !user) {
      return res.status(statusCode).json({
        message: "please login again",
        isError: is_Error,
        user,
      });
    }

    const newUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };

    // const userString = JSON.stringify(newUser);

    // await redis.set(`user:${payload.id}`, userString);
    req.user = newUser;
    log("user", req.user);
    next();
  },
);
