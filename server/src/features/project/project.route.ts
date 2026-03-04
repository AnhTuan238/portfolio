import { Router } from "express";

import {
  ProjectSchema,
  ProjectParamsSchema,
  ProjectQuerySchema,
} from "./project.schema";
import { projectController } from "./project.controller";
import { validate } from "@/shared";
import { authenticate } from "@/features/auth/auth.middleware";

const router = Router();

router.get(
  "/:id",
  // authenticate,
  validate({ params: ProjectParamsSchema }),
  projectController.getProject,
);

router.get(
  "/",
  // authenticate,
  validate({ query: ProjectQuerySchema }),
  projectController.getProjects,
);

router.post(
  "/",
  // authenticate,
  validate({ body: ProjectSchema }),
  projectController.createProject,
);

router.put(
  "/:id",
  // authenticate,
  validate({ params: ProjectParamsSchema, body: ProjectSchema }),
  projectController.updateProject,
);

router.delete(
  "/:id/force-delete",
  // authenticate,
  validate({ params: ProjectParamsSchema }),
  projectController.deleteProject,
);

router.delete(
  "/:id",
  // authenticate,
  validate({ params: ProjectParamsSchema }),
  projectController.softDeleteProject,
);

router.patch(
  "/:id/restore",
  // authenticate,
  validate({ params: ProjectParamsSchema }),
  projectController.restoreProject,
);

export default router;
