import mongoose from "mongoose";
import z from "zod";

const optionalUrl = z.preprocess(
  (val) => (val === "" ? undefined : val),
  z.string().url().optional(),
);

export const ProjectSchema = z
  .object({
    title: z.string().trim(),
    description: z.string().trim().optional(),
    technologies: z.string().trim().optional(),
    imageUrl: optionalUrl,
    liveUrl: optionalUrl,
    githubUrl: optionalUrl,
  })
  .strict();

export const ProjectParamsSchema = z
  .object({
    id: z.string().refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: "Invalid project ID",
    }),
  })
  .strict();

export const ProjectQuerySchema = z
  .object({
    isDeleted: z
      .enum(["true", "false"])
      .optional()
      .transform((val) => (val === undefined ? false : val === "true")),
  })
  .strict();
