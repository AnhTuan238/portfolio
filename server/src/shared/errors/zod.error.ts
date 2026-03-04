import { Response } from "express";
import z from "zod";

import { BAD_REQUEST } from "@/constants";
import { appConfig } from "@/config";

export const handleZodError = (res: Response, error: z.ZodError) => {
  if (appConfig.nodeEnv === "development") console.error(error);

  return res.status(BAD_REQUEST).json({
    message: "Invalid data",
    errors: error.issues.map((err) => ({
      path: err.path.join(),
      message: err.message,
    })),
  });
};
