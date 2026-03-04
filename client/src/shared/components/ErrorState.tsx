import { Button } from "@/shared/ui/button";

interface ErrorStateProps {
  message: string;
  label?: string;
  action?: () => void;
}

export const ErrorState = ({
  message,
  label = "Try again",
  action,
}: ErrorStateProps) => {
  return (
    <div className="w-full text-center text-2xl">
      <p>{message}</p>
      {action ? (
        <Button
          className="text-xl mt-8 text-white cursor-pointer"
          onClick={action}
        >
          {label}
        </Button>
      ) : null}
    </div>
  );
};
