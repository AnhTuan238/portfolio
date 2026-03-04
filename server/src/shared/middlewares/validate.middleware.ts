import { RequestHandler } from "express";
import { ZodSchema } from "zod";

interface ValidateSchema {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

export const validate = (schema: ValidateSchema): RequestHandler => {
  return (req, res, next) => {
    try {
      (["body", "query", "params"] as const).forEach((key) => {
        if (schema[key]) res.locals[key] = schema[key].parse(req[key]);
      });
      next();
    } catch (err) {
      next(err);
    }
  };
};
