import { type Request, type Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { loginType, registerType } from '../types/user.type.js';
import { validateInput } from '../middleware/validator.js';
import { loginSchema, registerSchema } from '../validators/user.schema.js';
import { createUser, getUser, getUserById } from '../services/auth.services.js';
import jwt from 'jsonwebtoken';

export const login = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as loginType;

  const { isError, message, verifiedData } = validateInput<loginType>(
    body,
    loginSchema,
  );

  if (isError) {
    return res.status(400).json({
      message,
      isError,
    });
  }

  const { data, is_Error, errorMessage, statusCode } = await getUser(
    verifiedData,
  );

  return res.status(statusCode).json({
    message: errorMessage,
    isError: is_Error,
    data,
  });
});

export const register = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as registerType;

  const { isError, message, verifiedData } = validateInput<registerType>(
    body,
    registerSchema,
  );

  if (isError) {
    return res.status(400).json({
      message,
      isError,
    });
  }

  const { data, is_Error, errorMessage, statusCode } = await createUser(
    verifiedData,
  );

  return res.status(statusCode).json({
    message: errorMessage,
    isError: is_Error,
    data,
  });
});

export const authenticateUser = asyncHandler(
  async (req: Request, res: Response) => {
    let token = req.cookies.access_token || req.headers.authorization;

    if (!token) {
      token = req.body.access_token;
    }

    if (!token) {
      return res.status(403).json({
        isError: true,
        message: 'please login',
      });
    }

    const id = jwt.decode(token) as string | null;

    const { data, errorMessage, is_Error, statusCode } = await getUserById(id);

    return res.status(statusCode).json({
      message: errorMessage,
      isError: is_Error,
      data,
    });
  },
);
