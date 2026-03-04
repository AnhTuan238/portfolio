import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import z from "zod";

import { INTERNAL_SERVER_ERROR } from "@/constants";
import { appConfig } from "@/config";
import {
  handleMongooseDuplicateKeyError,
  handleMongooseValidationError,
  handleAppError,
  handleZodError,
  AppError,
} from "@/shared";

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  if (appConfig.nodeEnv === "development")
    console.error(`[${new Date().toISOString()}] Error: ${err.message}`, {
      url: req.url,
      method: req.method,
      stack: err.stack,
    });

  if (err instanceof z.ZodError) return handleZodError(res, err);

  if (err instanceof AppError) return handleAppError(res, err);

  if (err instanceof mongoose.Error.ValidationError)
    return handleMongooseValidationError(res, err);

  if (err.code === 11000) return handleMongooseDuplicateKeyError(res, err);

  return res
    .status(INTERNAL_SERVER_ERROR)
    .json({ message: "Internal Server Error" });
};
