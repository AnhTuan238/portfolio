import { RequestHandler } from "express";
import { Document } from "mongoose";

export type UserController = {
  getUser: RequestHandler;
};

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  comparePassword(value: string): Promise<boolean>;
}
