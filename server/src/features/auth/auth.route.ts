import { Router } from "express";

import { authController } from "./auth.controller";
import { loginSchema } from "./auth.schema";
import { validate } from "@/shared";

const router = Router();

router.post("/login", validate({ body: loginSchema }), authController.login);
router.post("/logout", authController.logout);
router.post("/refresh", authController.refresh);

export default router;
