import { useMutation } from "@tanstack/react-query";

import { uploadImageToCloudinary } from "../lib/uploadImageToCloudinary";
import type { CreateProjectForm, Project } from "../types";
import { createProject } from "../api/admin.api";

import { queryClient } from "@/shared/config";
import { QUERY_KEY } from "@/shared";

export const useCreateProject = () => {
  const { mutateAsync, isPending: isCreating } = useMutation({
    mutationFn: async (values: CreateProjectForm) => {
      const { image, ...rest } = values;
      const imageUrl = image ? await uploadImageToCloudinary(image) : "";

      return createProject({ ...rest, imageUrl });
    },
    onSuccess: (newProject) => {
      queryClient.setQueryData<Project[]>(
        [QUERY_KEY.PROJECTS, { isDeleted: false }],
        (oldData) => {
          return [newProject, ...(oldData ?? [])];
        },
      );
    },
  });

  return { handleCreateProject: mutateAsync, isCreating };
};
