import dotenv from "dotenv";
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      sessionId?: string;
    }
  }
}

export const appConfig = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  refreshPath: "/api/auth",
  adminSecretKey: process.env.ADMIN_SECRET,
};
