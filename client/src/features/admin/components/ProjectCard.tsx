import { ProjectCardActions } from "./ProjectCardActions";

import type { ProjectCardProps } from "../types";

export const ProjectCard = ({ project, currentPage }: ProjectCardProps) => {
  const {
    _id,
    title,
    description,
    technologies = "",
    imageUrl,
    liveUrl,
    githubUrl,
  } = project;

  const techList = technologies.split(/\s*,\s*/).filter(Boolean);

  return (
    <article className="rounded-md shadow-md overflow-hidden flex flex-col bg-white h-125">
      <img src={imageUrl} alt={title} loading="lazy" className="w-full h-1/2" />

      <div className="flex-1 space-y-4 p-4 ">
        {/* Project Name */}
        <h3 className="text-lg font-semibold">{title}</h3>

        {/* Technologies */}
        <ul className="flex gap-2 flex-wrap max-h-16">
          {techList.slice(0, 3).map((tech) => {
            return (
              <li
                key={tech}
                className="py-1 text-sm px-2 rounded-md bg-primary flex gap-1 text-white font-medium"
              >
                {tech}
              </li>
            );
          })}
          {techList.length > 3 && (
            <li className="py-1 text-sm px-2 rounded-md bg-primary flex gap-1 text-white font-medium">
              +{techList.length - 3}
            </li>
          )}
        </ul>

        {/* Description */}
        <p className="text-sm line-clamp-3 break-words">{description}</p>
      </div>

      {/* Button */}
      <div className="flex justify-between gap-2 overflow-x-auto p-4 border-t border-gray-8">
        <ProjectCardActions
          projectId={_id}
          liveUrl={liveUrl}
          githubUrl={githubUrl}
          currentPage={currentPage}
        />
      </div>
    </article>
  );
};
