import {
  Header,
  HeroSection,
  AboutSection,
  ExperienceSection,
  Footer,
  NavSection,
  ProjectSection,
} from "./sections";

export const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <NavSection className="z-4 sticky top-0 w-full bg-white border-b border-gray-1 lg:hidden" />
        <AboutSection />
        <ProjectSection />
        <ExperienceSection />
      </main>
      <Footer />
    </>
  );
};
