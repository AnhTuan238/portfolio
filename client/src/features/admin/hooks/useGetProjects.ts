import { useQuery } from "@tanstack/react-query";

import { getProjects } from "../api";

import { QUERY_KEY } from "@/shared";

import type { GetProjectsParams } from "../types";

export const useGetProjects = (
  params: GetProjectsParams = { isDeleted: false },
) => {
  const {
    data: projects = [],
    isPending,
    ...rest
  } = useQuery({
    queryKey: [QUERY_KEY.PROJECTS, params],
    queryFn: () => getProjects(params),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return { projects, isLoadingProjects: isPending, ...rest };
};
