import { Response } from "express";

export const successResponse = (res: Response, message: string = "success") => {
  return res.status(200).json({
    isError: false,
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
