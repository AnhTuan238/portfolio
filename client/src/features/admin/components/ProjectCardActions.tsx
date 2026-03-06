import { toast } from "sonner";

import { useForceDeleteProject } from "../hooks/useForceDeleteProject";
import { useRestoreProject } from "../hooks/useRestoreProject";
import { useSoftDeleteProject } from "../hooks/useSoftDeleteProject";
import { ActionConfirmDialog } from "./ActionConfirmDialog";
import { ProjectActionButton } from "./ProjectActionButton";

import { logError } from "@/shared";

import type { ProjectCardActionsProps } from "../types";

const DashboardProjectActions = ({ projectId }: { projectId: string }) => {
  const { softDelete, isSoftDeleting } = useSoftDeleteProject({
    onSuccess: () => toast.success("Move project to trash successfully"),
    onError: (error: unknown) => {
      logError(error);
      toast.error("Move project to trash failed");
    },
  });

  return (
    <>
      <ProjectActionButton
        label="Edit"
        variant="bg-yellow-400 hover:bg-yellow-500"
      />
      <ProjectActionButton
        label="Move to trash"
        disabled={isSoftDeleting}
        action={() => softDelete(projectId)}
        variant="bg-red-500 text-white hover:bg-red-600"
      />
    </>
  );
};

const TrashProjectActions = ({ projectId }: { projectId: string }) => {
  const { restoreProject, isRestoring } = useRestoreProject({
    onSuccess: () => toast.success("Restore project successfully"),
    onError: (error: Error) => {
      logError(error);
      toast.error("Restore project failed");
    },
  });
  const { forceDeleteProject, isForceDeleting } = useForceDeleteProject({
    onSuccess: () => toast.success("Delete project successfully"),
    onError: (error: Error) => {
      logError(error);
      toast.error("Delete project failed");
    },
  });

  return (
    <>
      <ProjectActionButton
        label="Restore"
        disabled={isRestoring}
        action={() => restoreProject(projectId)}
        variant="project-card-button bg-white text-primary hover:bg-primary hover:text-white border border-primary"
      />
      <ActionConfirmDialog
        labelTrigger="Delete"
        titleModal="Are you sure?"
        descriptionModal="Are you sure you want to delete this project? This project CAN NOT be restored"
        labelAction="Delete"
        isProcessing={isForceDeleting}
        action={() => forceDeleteProject(projectId)}
      />
    </>
  );
};

const HomeProjectActions = ({
  liveUrl,
  githubUrl,
}: {
  liveUrl?: string;
  githubUrl?: string;
}) => {
  return (
    <>
      <ProjectActionButton
        label="Live"
        href={liveUrl}
        variant="bg-white text-primary hover:bg-primary hover:text-white border border-primary"
      />
      <ProjectActionButton
        label="GitHub"
        href={githubUrl}
        variant="bg-white hover:bg-black-2 hover:text-white border border-black-2"
      />
    </>
  );
};

export const ProjectCardActions = ({
  projectId,
  liveUrl,
  githubUrl,
  currentPage = "home",
}: ProjectCardActionsProps) => {
  if (currentPage === "trash") {
    return <TrashProjectActions projectId={projectId} />;
  }
  if (currentPage === "dashboard") {
    return <DashboardProjectActions projectId={projectId} />;
  }
  return <HomeProjectActions liveUrl={liveUrl} githubUrl={githubUrl} />;
};
