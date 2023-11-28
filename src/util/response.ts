import { Response } from "express";

export const successResponse = (
  res: Response,
  data?: unknown,
  message: string = "success",
) => {
  return res.status(200).json({
    isError: false,
    data,
    message,
  });
};

export const errorResponse = (
  res: Response,
  status: number = 500,
  message: string = "Error",
) => {
  return res.status(status).json({
    isError: true,
    message,
  });
};

export const serviceResult = (
  is_error: boolean,
  message: string,
  status: number,
  data?: unknown,
) => {
  return {
    is_error,
    errorMessage: message,
    statusCode: status,
    data,
  };
};
