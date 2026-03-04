import {
  Header,
  Hero,
  About,
  Experience,
  Footer,
  Nav,
  ProjectSection,
} from "./sections";

export const HomePage = () => {
  return (
    <main>
      <Header />
      <Hero />
      <Nav className="z-4 sticky top-0 w-full bg-white border-b border-gray-1 lg:hidden" />
      <About />
      <ProjectSection />
      <Experience />
      <Footer />
    </main>
  );
};
