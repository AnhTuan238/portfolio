import mongoose from "mongoose";

import { hashValue, compareValue } from "@/shared";
import { UserDocument } from "./user.type";

const userSchema = new mongoose.Schema<UserDocument>(
  {
    username: { type: String, requried: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await hashValue(this.password);
});

userSchema.methods.comparePassword = async function (password: string) {
  return compareValue(password, this.password);
};

export const UserModel = mongoose.model<UserDocument>("User", userSchema);
