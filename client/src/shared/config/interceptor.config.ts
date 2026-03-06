import axios from "axios";
import type { AxiosRequestConfig } from "axios";

import { UNAUTHORIZED, AUTH_ENDPOINTS } from "@/features";
import { axiosInstance } from "./axios.config";

interface FailedQueueItem {
  resolve: (value: unknown) => void;
  reject: (reason: any) => void;
}

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;

let failedQueue: FailedQueueItem[] = [];

const processQueue = (refreshError?: unknown) => {
  failedQueue.forEach((request) => {
    refreshError ? request.reject(refreshError) : request.resolve(true);
  });

  failedQueue = [];
};

export const setupAxiosInterceptor = (onLogout?: () => void) => {
  axiosInstance.interceptors.response.use(
    (response) => response,

    async (error: unknown) => {
      if (!axios.isAxiosError(error)) return Promise.reject(error);
      if (!error.response || !error.config) return Promise.reject(error);

      const originalRequest = error.config as CustomAxiosRequestConfig;

      if (
        error.response.status === UNAUTHORIZED &&
        !originalRequest.url?.includes(AUTH_ENDPOINTS.REFRESH) &&
        !originalRequest.url?.includes(AUTH_ENDPOINTS.LOGIN) &&
        !originalRequest._retry
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(() => axiosInstance(originalRequest));
        }
        originalRequest._retry = true;
        isRefreshing = true;

        try {
          await axiosInstance.post(AUTH_ENDPOINTS.REFRESH);

          processQueue();

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError);

          onLogout?.();

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );
};
