import jwt, { VerifyOptions, SignOptions } from "jsonwebtoken";
import { Types } from "mongoose";

export type TokenPayload = {
  userId: Types.ObjectId;
  sessionId: Types.ObjectId;
};

type SignOptionsAndSecret = SignOptions & {
  secret: string;
};

export const accessTokenSignOptions: SignOptionsAndSecret = {
  secret: process.env.JWT_ACCESS_KEY!,
  expiresIn: "15m",
};

export const refreshTokenSignOptions: SignOptionsAndSecret = {
  secret: process.env.JWT_REFRESH_KEY!,
  expiresIn: "7d",
};

export const signToken = (
  payload: TokenPayload,
  options?: SignOptionsAndSecret,
) => {
  const { secret, ...signOptions } = options || accessTokenSignOptions;
  return jwt.sign(payload, secret, signOptions);
};

export const verifyToken = <TPayload extends object = TokenPayload>(
  token: string,
  options?: VerifyOptions & {
    secret?: string;
  },
) => {
  const { secret = process.env.JWT_ACCESS_KEY!, ...verifyOpts } = options || {};
  try {
    const payload = jwt.verify(token, secret, verifyOpts) as TPayload;
    return {
      payload,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
