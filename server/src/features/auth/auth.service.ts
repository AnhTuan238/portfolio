import { AuthResult, LoginRequest } from "./auth.type";
import { UNAUTHORIZED } from "@/constants";
import { UserModel } from "@/features/user";
import { SessionModel } from "./auth.model";
import {
  refreshTokenSignOptions,
  TokenPayload,
  verifyToken,
  signToken,
  appAssert,
  AppError,
  sevenDaysFromNow,
} from "@/shared";

export const authService = {
  login: async ({
    email,
    password,
    userAgent,
  }: LoginRequest): Promise<AuthResult> => {
    const user = await UserModel.findOne({ email }).select("username password");

    appAssert(user, UNAUTHORIZED, "Invalid email or password");

    const isMatch = await user.comparePassword(password);
    appAssert(isMatch, UNAUTHORIZED, "Invalid email or password");

    const userId = user._id;

    const session = await SessionModel.create({
      userId,
      userAgent,
      expiresAt: sevenDaysFromNow(),
    });

    const sessionInfo: TokenPayload = {
      userId,
      sessionId: session._id,
    };

    const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);
    const accessToken = signToken(sessionInfo);

    return {
      safeUser: { _id: userId, username: user.username },
      accessToken,
      refreshToken,
    };
  },

  logout: async (refreshToken: string) => {
    try {
      const { payload } = verifyToken<TokenPayload>(refreshToken, {
        secret: refreshTokenSignOptions.secret,
      });
      if (payload) {
        await SessionModel.findByIdAndDelete(payload.sessionId);
      }
    } catch (err: any) {
      console.error("Logout failed: ", err);
    }
  },

  refreshToken: async (refreshToken: string) => {
    const { payload } = verifyToken<TokenPayload>(refreshToken, {
      secret: refreshTokenSignOptions.secret,
    });
    appAssert(payload, UNAUTHORIZED, "Invalid refresh token");

    const userId = payload.userId;

    const oldSession = await SessionModel.findOneAndDelete({
      _id: payload.sessionId,
      userId,
    });

    if (!oldSession) {
      await SessionModel.deleteMany({ userId });

      throw new AppError(UNAUTHORIZED, "Refresh token reuse detected");
    }

    if (oldSession.expiresAt.getTime() < Date.now()) {
      throw new AppError(UNAUTHORIZED, "Session expired");
    }

    const newSession = await SessionModel.create({
      userId,
      userAgent: oldSession.userAgent,
    });

    const tokenInfo = {
      userId,
      sessionId: newSession._id,
    };

    const newRefreshToken = signToken(tokenInfo, refreshTokenSignOptions);
    const newAccessToken = signToken(tokenInfo);

    return {
      newAccessToken,
      newRefreshToken,
    };
  },
};
