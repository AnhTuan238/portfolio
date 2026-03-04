import { Router } from "express";

import { userController } from "./user.controller";
import { authenticate } from "@/features/auth";

const router = Router();

router.get("/", authenticate, userController.getUser);

export default router;
