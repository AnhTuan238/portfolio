import { ProjectModel } from "./project.model";
import { NOT_FOUND } from "@/constants";
import { Project } from "./project.type";
import { appAssert } from "@/shared/utils";

const FIELD_SELECT = "title description imageUrl liveUrl githubUrl";

export const projectService = {
  getProjects: async (isDeleted?: boolean) => {
    const projects = await ProjectModel.find({ isDeleted })
      .sort({ createdAt: -1 })
      .select(FIELD_SELECT)
      .lean();

    return projects;
  },

  getProject: async (id: string) => {
    const project = await ProjectModel.findOne({ _id: id, isDeleted: false })
      .select(FIELD_SELECT)
      .lean();

    appAssert(project, NOT_FOUND, "Project not found");

    return project;
  },

  create: async (data: Project) => {
    const project = await ProjectModel.create(data);
    const { __v, createdAt, updatedAt, isDeleted, ...safeProject } =
      project.toObject();

    return safeProject;
  },

  update: async (id: string, data: Project) => {
    const project = await ProjectModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
      .select(FIELD_SELECT)
      .lean();

    appAssert(project, NOT_FOUND, "Project not found");

    return project;
  },

  delete: async (id: string) => {
    const project = await ProjectModel.findByIdAndDelete(id)
      .select(FIELD_SELECT)
      .lean();

    appAssert(project, NOT_FOUND, "Project not found");

    return project;
  },

  softDelete: async (id: string) => {
    const project = await ProjectModel.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      { new: true, runValidators: true },
    )
      .select(FIELD_SELECT)
      .lean();

    appAssert(project, NOT_FOUND, "Project not found");

    return project;
  },

  restore: async (id: string) => {
    const project = await ProjectModel.findByIdAndUpdate(
      id,
      {
        isDeleted: false,
      },
      { new: true, runValidators: true },
    )
      .select(FIELD_SELECT)
      .lean();

    appAssert(project, NOT_FOUND, "Project not found");

    return project;
  },
};
