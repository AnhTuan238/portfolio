import mongoose, { InferSchemaType } from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
    liveUrl: { type: String },
    githubUrl: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

type ProjectDocument = InferSchemaType<typeof projectSchema>;

projectSchema.index({ createdAt: -1 });

export const ProjectModel = mongoose.model<ProjectDocument>(
  "Project",
  projectSchema,
);
