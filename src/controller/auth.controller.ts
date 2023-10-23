import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const login = asyncHandler(async (_req: Request, res: Response) => {
  res.status(200).json({
    error: false,
    message: "success",
  });
});
