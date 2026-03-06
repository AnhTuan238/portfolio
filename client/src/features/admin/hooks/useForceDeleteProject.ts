import { useMutation } from "@tanstack/react-query";

import { deleteProject } from "../api/admin.api";

import { queryClient } from "@/shared/config";
import { QUERY_KEY } from "@/shared";

import type { Project, ProjectActionCallbacks } from "../types";

export const useForceDeleteProject = (options?: ProjectActionCallbacks) => {
  const { mutateAsync, isPending, ...rest } = useMutation({
    mutationFn: deleteProject,
    onSuccess: (deletedProject) => {
      queryClient.setQueryData<Project[]>(
        [QUERY_KEY.PROJECTS, { isDeleted: true }],
        (oldData) => {
          return (oldData ?? []).filter((p) => p._id !== deletedProject._id);
        },
      );
      options?.onSuccess?.();
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });

  return {
    forceDeleteProject: mutateAsync,
    isForceDeleting: isPending,
    ...rest,
  };
};
