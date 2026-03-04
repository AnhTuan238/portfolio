import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { projectRouter, userRouter, authRouter } from "@/features";
import { errorHandler } from "@/shared/middlewares";

const app = express();

app.use(
  cors({
    origin: process.env.BASE_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/me", userRouter);
app.use("/api/projects", projectRouter);

app.use(errorHandler);

export default app;
