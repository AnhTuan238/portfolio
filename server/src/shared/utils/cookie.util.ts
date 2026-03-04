import { CookieOptions, Response } from "express";

import { appConfig } from "@/config";

const isProduction = appConfig.nodeEnv === "production";

const defaultOptions: CookieOptions = {
  httpOnly: true,
  sameSite: isProduction ? "none" : "lax",
  secure: isProduction,
};

const accessTokenOptions: CookieOptions = {
  ...defaultOptions,
  maxAge: 15 * 60 * 1000,
};
const refreshTokenOptions: CookieOptions = {
  ...defaultOptions,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: appConfig.refreshPath,
};

export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
) => {
  res
    .cookie("accessToken", accessToken, accessTokenOptions)
    .cookie("refreshToken", refreshToken, refreshTokenOptions);
};

export const clearAuthCookies = (res: Response) =>
  res.clearCookie("accessToken", defaultOptions).clearCookie("refreshToken", {
    ...defaultOptions,
    path: appConfig.refreshPath,
  });
