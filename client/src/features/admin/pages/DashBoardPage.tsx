import { useSmartLoading } from "../hooks/useMinimumLoading";
import { useGetProjects } from "../hooks/useGetProjects";
import { ProjectSkeleton } from "../components/ProjectSkeleton";
import { ProjectList } from "../components/ProjectList";

import { ErrorState } from "@/shared";

export const DashboardPage = () => {
  const { projects, isLoading, isError, refetch } = useGetProjects();
  const show = useSmartLoading(isLoading, 400);

  if (isError)
    return (
      <ErrorState
        message="Failed to load projects. Please try again later."
        label="Refetch"
        action={refetch}
      />
    );

  return (
    <>
      <h1 className="text-3xl font-medium mb-10 ">DASHBOARD</h1>
      {show ? (
        <ProjectSkeleton />
      ) : projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        <ProjectList projects={projects} currentPage="dashboard" />
      )}
    </>
  );
};
