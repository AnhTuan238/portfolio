import { useMutation } from "@tanstack/react-query";

import { restoreProject } from "../api";
import { queryClient } from "@/shared/config";
import { QUERY_KEY } from "@/shared";

import type { Project, ProjectActionCallbacks } from "../types";

export const useRestoreProject = (options?: ProjectActionCallbacks) => {
  const { mutateAsync, isPending, ...rest } = useMutation({
    mutationFn: restoreProject,

    onSuccess: (project, id) => {
      // Update cache in Trash Page
      queryClient.setQueryData<Project[]>(
        [QUERY_KEY.PROJECTS, { isDeleted: true }],
        (oldData) => {
          return (oldData ?? []).filter((project) => project._id !== id);
        },
      );
      // Update cache in Dasboard Page
      queryClient.setQueryData<Project[]>(
        [QUERY_KEY.PROJECTS, { isDeleted: false }],
        (oldData) => {
          return [project, ...(oldData ?? [])];
        },
      );

      options?.onSuccess?.();
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });

  return {
    restoreProject: mutateAsync,
    isRestoring: isPending,
    ...rest,
  };
};
