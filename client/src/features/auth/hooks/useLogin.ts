import { useMutation } from "@tanstack/react-query";

import { login } from "../api/auth.api";

import { queryClient } from "@/shared/config";
import { QUERY_KEY } from "@/shared";

export const useLogin = () => {
  const { mutateAsync: signIn, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      queryClient.setQueryData([QUERY_KEY.ME], user);
    },
  });

  return { signIn, isPending };
};
