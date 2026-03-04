import assert from "node:assert";

import type { HttpStatusCode } from "@/constants";
import { AppError } from "@/shared/errors";

type AppAssert = (
  condition: any,
  httpStatusCode: HttpStatusCode,
  message: string,
) => asserts condition;

export const appAssert: AppAssert = (condition, httpStatusCode, message) =>
  assert(condition, new AppError(httpStatusCode, message));
