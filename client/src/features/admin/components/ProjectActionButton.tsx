import type { ProjectActionButtonProps } from "../types";

export const ProjectActionButton = (props: ProjectActionButtonProps) => {
  const { label, disabled, variant } = props;

  if ("href" in props) {
    return (
      <a
        href={props.href}
        rel="noopener noreferrer"
        target="_blank"
        className={`project-card-button ${variant}`}
      >
        {label}
      </a>
    );
  }

  return (
    <button
      disabled={disabled}
      onClick={props.action}
      className={`project-card-button ${variant}`}
    >
      {label}
    </button>
  );
};
