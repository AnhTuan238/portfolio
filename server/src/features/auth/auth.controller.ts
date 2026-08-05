import { clearAuthCookies, setAuthCookies, appAssert } from "@/shared";
import { NO_CONTENT, OK, UNAUTHORIZED } from "@/constants";
import { AuthController } from "./auth.type";
import { authService } from "./auth.service";

export const authController: AuthController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    const userAgent = req.headers["user-agent"] || "Unknown device";

    const { safeUser, accessToken, refreshToken } = await authService.login({
      email,
      password,
      userAgent,
    });

    setAuthCookies(res, accessToken, refreshToken);

    return res.status(OK).json(safeUser);
  },

  logout: async (req, res) => {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      await authService.logout(refreshToken);
    }

    clearAuthCookies(res);

    return res.status(NO_CONTENT).send();
  },

  refresh: async (req, res) => {
    const { refreshToken } = req.cookies;
    appAssert(refreshToken, UNAUTHORIZED, "Refresh token not provided");

    const { newAccessToken, newRefreshToken } =
      await authService.refreshToken(refreshToken);

    setAuthCookies(res, newAccessToken, newRefreshToken);

    return res.status(NO_CONTENT).send();
  },
};
