import { ProjectSkeleton } from "../components/ProjectSkeleton";
import { ProjectList } from "../components/ProjectList";

import { ErrorState } from "@/shared";
import { useGetProjects, useSmartLoading } from "../hooks";

export const TrashPage = () => {
  const { projects, isLoading, isError, refetch } = useGetProjects({
    isDeleted: true,
  });

  const show = useSmartLoading(isLoading, 400);

  if (show) return <ProjectSkeleton />;

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
      <h1 className="text-3xl font-medium mb-10 ">TRASH</h1>
      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        <ProjectList projects={projects} currentPage="trash" />
      )}
    </>
  );
};
