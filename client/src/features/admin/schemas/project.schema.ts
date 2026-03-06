import z from "zod";

const optionalUrl = z
  .union([z.string().url(), z.literal("")])
  .transform((value) => (value === "" ? undefined : value))
  .optional();

export const createProjectFormSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    technologies: z.string().optional(),
    image: z.instanceof(File).optional(),
    liveUrl: optionalUrl,
    githubUrl: optionalUrl,
  })
  .strict();
