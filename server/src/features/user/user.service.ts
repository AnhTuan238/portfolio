import { NOT_FOUND } from "@/constants";
import { UserModel } from "./user.model";
import { appAssert } from "@/shared";

export const userService = {
  getUser: async (
    userId: string,
  ): Promise<{ id: string; username: string }> => {
    const user = await UserModel.findById(userId).select("username").lean();

    appAssert(user, NOT_FOUND, "User not found");

    return {
      id: user._id.toString(),
      username: user.username,
    };
  },
};
