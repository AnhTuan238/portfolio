import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/ui/alert-dialog";

import type { ActionConfirmDialogProps } from "../types";

export const ActionConfirmDialog = ({
  labelTrigger,
  titleModal,
  descriptionModal,
  labelAction,
  isProcessing,
  action,
}: ActionConfirmDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="cursor-pointer project-card-button bg-red-500 text-white hover:bg-red-600">
          {labelTrigger}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white border-none shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl mb-4">
            {titleModal}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-lg">
            {descriptionModal}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="action-confirm-button bg-black">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={action}
            disabled={isProcessing}
            className="action-confirm-button bg-red-500 hover:bg-red-600"
          >
            {labelAction}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
