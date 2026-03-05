import { redirect } from "react-router";
import { AxiosError } from "axios";

import { getUser } from "@/features/admin";
import { QUERY_KEY } from "@/shared";
import { queryClient } from "@/shared/config";

export const protectedLoader = async () => {
  try {
    return await queryClient.ensureQueryData({
      queryKey: [QUERY_KEY.ME],
      queryFn: getUser,
      staleTime: Infinity,
      gcTime: Infinity,
    });
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw redirect("/login");
    }
  }
};
