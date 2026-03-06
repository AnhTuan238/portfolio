import { axiosInstance } from "@/shared";

import type {
  CreateProjectPayload,
  GetProjectsParams,
  Project,
  User,
} from "../types";

const ADMIN_ENDPOINTS = {
  ME: "/api/me",
  PROJECTS: "/api/projects",
};

export const getUser = async (): Promise<User> => {
  const { data } = await axiosInstance.get<User>(ADMIN_ENDPOINTS.ME);

  return data;
};

export const createProject = async (
  value: CreateProjectPayload,
): Promise<Project> => {
  const { data } = await axiosInstance.post<Project>(
    ADMIN_ENDPOINTS.PROJECTS,
    value,
  );

  return data;
};

export const getProjects = async (
  params?: GetProjectsParams,
): Promise<Project[]> => {
  const { data } = await axiosInstance.get<Project[]>(
    ADMIN_ENDPOINTS.PROJECTS,
    { params },
  );

  return data;
};

export const softDeleteProject = async (id: string): Promise<Project> => {
  const { data } = await axiosInstance.delete<Project>(
    `${ADMIN_ENDPOINTS.PROJECTS}/${id}`,
  );

  return data;
};

export const restoreProject = async (id: string): Promise<Project> => {
  const { data } = await axiosInstance.patch<Project>(
    `${ADMIN_ENDPOINTS.PROJECTS}/${id}/restore`,
  );

  return data;
};

export const deleteProject = async (id: string): Promise<Project> => {
  const { data } = await axiosInstance.delete<Project>(
    `${ADMIN_ENDPOINTS.PROJECTS}/${id}/force-delete`,
  );

  return data;
};
