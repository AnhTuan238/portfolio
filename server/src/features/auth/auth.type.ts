import { RequestHandler } from "express";
import z from "zod";

import { UserDocument } from "@/features/user";
import { loginSchema } from "./auth.schema";

export type LoginInput = z.infer<typeof loginSchema>;

export type LoginRequest = LoginInput & { userAgent?: string };

export type AuthResult = {
  safeUser: Pick<UserDocument, "_id" | "username">;
  accessToken: string;
  refreshToken: string;
};

export type AuthController = {
  login: RequestHandler;
  logout: RequestHandler;
  refresh: RequestHandler;
};
