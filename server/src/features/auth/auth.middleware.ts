import { RequestHandler } from "express";

import { appAssert, verifyToken } from "@/shared";
import { UNAUTHORIZED } from "@/constants";

export const authenticate: RequestHandler = (req, _res, next) => {
  const accessToken = req.cookies.accessToken;
  appAssert(accessToken, UNAUTHORIZED, "Unauthorized");

  const { error, payload } = verifyToken(accessToken);
  appAssert(
    payload,
    UNAUTHORIZED,
    error === "JWT expired" ? "Token expired" : "Invalid token",
  );

  req.userId = payload.userId.toString();
  next();
};
