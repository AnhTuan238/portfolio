import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { logout } from "../api/auth.api";

import { queryClient } from "@/shared/config";
import { QUERY_KEY } from "@/shared";

export const useLogout = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.removeQueries({ queryKey: [QUERY_KEY.ME] });
      navigate("/", { replace: true });
    },
  });

  return { signOut: mutate, isLoggingOut: isPending };
};
