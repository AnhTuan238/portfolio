import { useMutation } from "@tanstack/react-query";

import { softDeleteProject } from "../api";

import { queryClient } from "@/shared/config";
import { QUERY_KEY } from "@/shared";

import type { Project, ProjectActionCallbacks } from "../types";

export const useSoftDeleteProject = (options?: ProjectActionCallbacks) => {
  const { mutateAsync, isPending, ...rest } = useMutation({
    mutationFn: softDeleteProject,
    onSuccess: (deletedProject, id) => {
      // Update cache in Dashboard Page
      queryClient.setQueryData<Project[]>(
        [QUERY_KEY.PROJECTS, { isDeleted: false }],
        (oldData) => {
          return (oldData ?? []).filter((project) => project._id !== id);
        },
      );

      // Update cache  in Trash Page
      queryClient.setQueryData<Project[]>(
        [QUERY_KEY.PROJECTS, { isDeleted: true }],
        (oldData) => {
          return [deletedProject, ...(oldData ?? [])];
        },
      );

      options?.onSuccess?.();
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });

  return {
    ...rest,
    softDelete: mutateAsync,
    isSoftDeleting: isPending,
  };
};
