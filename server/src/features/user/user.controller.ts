import { OK, NOT_FOUND } from "@/constants";
import { UserController } from "./user.type";
import { userService } from "./user.service";
import { appAssert } from "@/shared";

export const userController: UserController = {
  getUser: async (req, res) => {
    const userId = req.userId;

    appAssert(userId, NOT_FOUND, "User not found");

    const user = await userService.getUser(userId);

    return res.status(OK).json(user);
  },
};
