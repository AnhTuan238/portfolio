import z from "zod";

import { createProjectFormSchema } from "./schemas/project.schema";

export type User = {
  _id: string;
  username: string;
};

export interface GetProjectsParams {
  isDeleted?: boolean;
}

type CurrentPage = "home" | "dashboard" | "trash";

export interface ProjectCardActionsProps {
  projectId: string;
  liveUrl?: string;
  githubUrl?: string;
  currentPage: CurrentPage;
}

export type CreateProjectForm = z.infer<typeof createProjectFormSchema>;

export type Project = {
  _id: string;
  title: string;
  description?: string;
  technologies?: string;
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
};

export type ProjectCardProps = {
  project: Project;
  currentPage: CurrentPage;
};

export type ProjectListProps = {
  projects: Project[];
  currentPage: CurrentPage;
};

export type ActionConfirmDialogProps = {
  labelTrigger: string;
  titleModal: string;
  descriptionModal: string;
  labelAction: string;
  isProcessing: boolean;
  action: () => void;
};

export type CreateProjectPayload = {
  title: string;
  description?: string;
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
};

export type ProjectActionCallbacks = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export type ProjectActionButtonProps = {
  label: string;
  action?: () => void;
  href?: string;
  disabled?: boolean;
  variant?: string;
};
