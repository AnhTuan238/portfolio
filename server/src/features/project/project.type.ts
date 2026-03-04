import { RequestHandler } from "express";
import z from "zod";

import { ProjectSchema } from "./project.schema";

export type ProjectController = {
  getProjects: RequestHandler;
  getProject: RequestHandler;
  createProject: RequestHandler;
  updateProject: RequestHandler;
  deleteProject: RequestHandler;
  softDeleteProject: RequestHandler;
  restoreProject: RequestHandler;
};

export type Project = z.infer<typeof ProjectSchema>;
