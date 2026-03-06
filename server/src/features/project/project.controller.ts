import { CREATED, OK } from "@/constants";
import { ProjectController } from "./project.type";
import { projectService } from "./project.service";

export const projectController: ProjectController = {
  getProjects: async (_req, res) => {
    const { isDeleted } = res.locals.query;

    const projects = await projectService.getProjects(isDeleted);

    return res.status(OK).json(projects);
  },

  getProject: async (_req, res) => {
    const { id } = res.locals.params;

    const project = await projectService.getProject(id);

    return res.status(OK).json(project);
  },

  createProject: async (_req, res) => {
    const { title, description, technologies, imageUrl, liveUrl, githubUrl } =
      res.locals.body;

    const project = await projectService.create({
      title,
      description,
      technologies,
      imageUrl,
      liveUrl,
      githubUrl,
    });

    return res.status(CREATED).json(project);
  },

  updateProject: async (_req, res) => {
    const { title, description, imageUrl, liveUrl, githubUrl } =
      res.locals.body;
    const { id } = res.locals.params;

    const project = await projectService.update(id, {
      title,
      description,
      imageUrl,
      liveUrl,
      githubUrl,
    });

    return res.status(OK).json(project);
  },

  deleteProject: async (_req, res) => {
    const { id } = res.locals.params;

    const project = await projectService.delete(id);

    return res.status(OK).json(project);
  },

  softDeleteProject: async (_req, res) => {
    const { id } = res.locals.params;

    const project = await projectService.softDelete(id);

    return res.status(OK).json(project);
  },

  restoreProject: async (_req, res) => {
    const { id } = res.locals.params;

    const project = await projectService.restore(id);

    return res.status(OK).json(project);
  },
};
