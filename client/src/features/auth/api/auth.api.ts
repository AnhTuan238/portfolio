import { axiosInstance } from "@/shared/config";

import type { LoginFormValues } from "../types";
import type { User } from "@/features/admin";

export const AUTH_ENDPOINTS = {
  LOGIN: "/api/auth/login",
  LOGOUT: "/api/auth/logout",
  REFRESH: "/api/auth/refresh",
};

export const login = async (value: LoginFormValues): Promise<User> => {
  const { data } = await axiosInstance.post<User>(AUTH_ENDPOINTS.LOGIN, value);

  return data;
};

export const logout = async (): Promise<void> =>
  await axiosInstance.post(AUTH_ENDPOINTS.LOGOUT);
