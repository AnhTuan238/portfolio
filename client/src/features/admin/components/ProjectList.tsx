import { ProjectCard } from "./ProjectCard";

import type { ProjectListProps } from "../types";

export const ProjectList = ({ projects, currentPage }: ProjectListProps) => {
  if (projects.length === 0) {
    return <p>No projects found.</p>;
  }
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <li key={project._id}>
          <ProjectCard project={project} currentPage={currentPage} />
        </li>
      ))}
    </ul>
  );
};
