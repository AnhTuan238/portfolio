import { useGetProjects, ProjectList } from "@/features";
import { Trans, useTranslation } from "react-i18next";

export const ProjectSection = () => {
  const { projects } = useGetProjects({ isDeleted: false });
  const { t } = useTranslation();

  return (
    <section id="projects" className="py-40 w-full scroll-mt-19">
      <div className=" max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-15">
          <h2 className="text-4xl font-bold text-black-1 lg:text-[70px] mb-5">
            {t("projects")}
          </h2>
          <p className="font-medium text-sm text-gray-2 lg:text-xl">
            <Trans i18nKey="projectSection.description" />
          </p>
        </div>

        <ProjectList projects={projects} currentPage="home" />
      </div>
    </section>
  );
};
