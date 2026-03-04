import { Response } from "express";

import { BAD_REQUEST, CONFLICT } from "@/constants";
import { appConfig } from "@/config";

export const handleMongooseValidationError = (res: Response, error: any) => {
  if (appConfig.nodeEnv === "development")
    console.error("Mongoose validation error: ", error);

  return res.status(BAD_REQUEST).json({
    message: "Invalid data",
    errors: Object.values(error.errors).map((e: any) => ({
      field: e.path,
      message: e.message,
    })),
  });
};

//  Race condition
export const handleMongooseDuplicateKeyError = (res: Response, error: any) => {
  if (appConfig.nodeEnv === "development")
    console.error("Mongoose duplicate key error: ", error);

  const field = Object.keys(error.keyValue)[0];
  return res.status(CONFLICT).json({
    message: `${field} already exists`,
  });
};
