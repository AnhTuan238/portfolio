import { useGetProjects, ProjectList } from "@/features/admin";

export const ProjectSection = () => {
  const { projects } = useGetProjects({ isDeleted: false });

  return (
    <section id="projects" className="py-40 w-full scroll-mt-19">
      <div className=" max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-15">
          <h2 className="text-4xl font-bold text-black-1 lg:text-[70px] mb-5">
            Projects
          </h2>
          <p className="font-medium text-sm text-gray-2 lg:text-xl">
            A collection of projects that showcase my skills,
            <br />
            where creativity meets problem-solving to build impactful and
            practical applications
          </p>
        </div>

        <ProjectList projects={projects} currentPage="home" />
      </div>
    </section>
  );
};
