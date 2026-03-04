import z from "zod";

import { loginSchema } from "./schemas/login.schema";

export type LoginFormValues = z.infer<typeof loginSchema>;

export type LoginResponse = {
  _id: string;
  email: string;
};
