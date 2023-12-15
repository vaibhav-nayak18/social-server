import { type Request, type Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { loginType, registerType } from "../types/user.type.js";
import { validateInput } from "../middleware/validator.js";
import { loginSchema, registerSchema } from "../validators/user.schema.js";
import { createUser, getUser, getUserById } from "../services/auth.services.js";
import jwt from "jsonwebtoken";
import { cookieToken } from "../middleware/cookieToken.js";
import redis from "../config/redis.js";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as loginType;

  const { isError, message, verifiedData } = await validateInput<loginType>(
    body,
    loginSchema,
  );

  if (isError) {
    return res.status(400).json({
      message,
      isError,
    });
  }

  const {
    data: user,
    is_Error,
    errorMessage,
    statusCode,
  } = await getUser(verifiedData);

  if (is_Error || !user) {
    return res.status(statusCode).json({
      message: errorMessage,
      isError: is_Error,
    });
  }

  await cookieToken(user, res);

  return res.status(statusCode).json({
    message: "Login successful",
    isError: is_Error,
    data: {
      username: user.username,
      id: user._id,
    },
  });
});

export const register = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as registerType;

  const { isError, message, verifiedData } = await validateInput<registerType>(
    body,
    registerSchema,
  );

  if (isError) {
    return res.status(400).json({
      message,
      isError,
    });
  }

  const {
    data: user,
    is_Error,
    errorMessage,
    statusCode,
  } = await createUser(verifiedData);

  if (is_Error || !user) {
    return res.status(statusCode).json({
      message: errorMessage,
      isError: is_Error,
    });
  }

  await cookieToken(user, res);

  const userString = JSON.stringify({
    username: user.username,
    email: user.email,
    id: user._id,
  });

  await redis.set(`user:${user._id}`, userString);

  return res.status(statusCode).json({
    message: "Account created successful",
    isError: is_Error,
    data: {
      username: user.username,
      id: user._id,
      email: user.email,
    },
  });
});

export const authenticateUser = asyncHandler(
  async (req: Request, res: Response) => {
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

    const cacheUser = await redis.get(`user:${payload.id}`);

    if (cacheUser) {
      const user = JSON.parse(cacheUser) as {
        _id: string;
        username: string;
        email: string;
      };
      return res.status(200).json({
        message: "User is authenticated",
        isError: false,
        data: {
          username: user.username,
          id: user._id,
          email: user.email,
        },
      });
    }

    const {
      data: user,
      errorMessage,
      is_Error,
      statusCode,
    } = await getUserById(payload.id);

    if (is_Error || !user) {
      return res.status(statusCode).json({
        message: errorMessage,
        isError: is_Error,
      });
    }

    const userString = JSON.stringify({
      username: user.username,
      email: user.email,
      id: user._id,
    });

    await redis.set(`user:${payload.id}`, userString);

    return res.status(statusCode).json({
      message: "User is authenticated",
      isError: is_Error,
      data: {
        username: user.username,
        email: user.email,
        id: user._id,
      },
    });
  },
);
