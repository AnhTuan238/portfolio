import { Response } from "express";

import { appConfig } from "@/config";

import type { HttpStatusCode } from "@/constants";

export class AppError extends Error {
  constructor(
    public statusCode: HttpStatusCode,
    public message: string,
  ) {
    super(message);
  }
}

export const handleAppError = (res: Response, error: AppError) => {
  if (appConfig.nodeEnv === "development") console.error(error);

  res.status(error.statusCode).json({ message: error.message });
};
