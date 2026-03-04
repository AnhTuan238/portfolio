import { redirect } from "react-router";
import { AxiosError } from "axios";
import { toast } from "sonner";

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
      if (!error.response) {
        toast.error("Cannot connect to server. Please check your connection.");
        return;
      }
      if ([400, 401].includes(error.response.status)) {
        toast.warning("Please login to continue");
        throw redirect("/login");
      }
    }

    throw error;
  }
};
