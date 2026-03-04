import mongoose, { InferSchemaType } from "mongoose";

import { sevenDaysFromNow } from "@/shared";

const sessionSchema = new mongoose.Schema({
  userId: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
  },
  userAgent: { type: String },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, default: sevenDaysFromNow },
});

type SessionDocument = InferSchemaType<typeof sessionSchema>;

export const SessionModel = mongoose.model<SessionDocument>(
  "Session",
  sessionSchema,
);
