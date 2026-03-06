import { useMutation } from "@tanstack/react-query";

import { login } from "../api/auth.api";

import { QUERY_KEY, queryClient } from "@/shared";

export const useLogin = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      queryClient.setQueryData([QUERY_KEY.ME], user);
    },
  });

  return { signIn: mutateAsync, isPending };
};
