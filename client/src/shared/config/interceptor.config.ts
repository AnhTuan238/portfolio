import { UNAUTHORIZED, AUTH_ENDPOINTS } from "@/features";
import { axiosInstance } from "./axios.config";

interface FailedQueueItem {
  resolve: (value: unknown) => void;
  reject: (reason: any) => void;
}

let isRefreshing = false;

let failedQueue: FailedQueueItem[] = [];

const processQueue = (error?: any) => {
  failedQueue.forEach((request) => {
    error ? request.reject(error) : request.resolve(true);
  });

  failedQueue = [];
};

export const setupAxiosInterceptor = (onLogout?: () => void) => {
  axiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
      if (!error.response) return Promise.reject(error);

      const originalRequest = error.config;

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
