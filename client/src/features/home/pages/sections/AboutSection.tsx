export const About = () => {
  return (
    <section
      id="about"
      className="relative max-w-7xl m-auto pt-7.5 pb-20 px-6 lg:mt-50 lg:py-0 lg:px-8 scroll-mt-19"
    >
      <div className="absolute bottom-0 w-[1px] bg-size-[1px_5px] bg-repeat-y bg-linear-[180deg,#b2b2b2,#b2b2b2_2px,transparent_0,transparent_5px] after:content-['\30FB'] after:absolute after:size-5 after:border after:border-gray-6 after:bg-white after:-left-[9px] after:-bottom-[13px] after:rounded-full after:flex after:items-center after:justify-center after:text-gray-6 -translate-x-1/2  left-10 top-7.5 lg:top-0 lg:left-[50%]"></div>

      <div className="flex flex-col-reverse items-center pb-20 lg:py-38 lg:flex-row">
        <div className="w-full lg:w-1/2 pl-12 pt-7 before:hidden before:absolute before:size-2.5 before:top-0 before:left-5 before:-translate-y-1/2 before:-translate-x-1/2 before:border before:border-gray-400 before:rounded-full lg:pt-0 lg:pl-0 lg:pr-28 lg:before:left-[50%]  lg:before:inline-block">
          <h3 className="text-2xl font-semibold lg:text-4xl">HO ANH TUAN</h3>
          <p className="mt-2 text-gray-2 text-sm/[1.7] text-justify lg:text-lg">
            I was born in 2003 and graduated in{" "}
            <strong className="text-primary">Computer Engineering</strong> from{" "}
            <strong className="text-primary">
              Ho Chi Minh City University of Technology and Education (HCMUTE)
            </strong>
            (HCMUTE). I have a great passion for web development and
            continuously learn new technologies to build high-quality and useful
            digital products.
          </p>
        </div>

        <div className="w-full lg:w-1/2 z-1">
          <img src="/about.gif" alt="About me" className="w-full aspect-11/7" />
        </div>
      </div>

      <div className="relative flex flex-col-reverse items-center pt-0 lg:py-38 lg:flex-row-reverse">
        <div className="w-full lg:w-1/2 pl-12 pt-7 before:hidden before:absolute before:size-2.5 before:top-0 before:left-5 before:-translate-y-1/2 before:-translate-x-1/2 before:border before:border-gray-400 before:rounded-full  lg:pl-28 lg:before:left-[50%]  lg:before:inline-block">
          {" "}
          <h3 className="text-2xl font-semibold lg:text-4xl">MY SKILLS</h3>
          <p className="mt-2 text-gray-2 text-sm/[1.7] text-justify lg:text-lg">
            I am experienced in modern web development using{" "}
            <strong className="text-primary">ReactJS</strong>,{" "}
            <strong className="text-primary">NextJS</strong>, and{" "}
            <strong className="text-primary">NodeJS</strong>, and have a strong
            interest in{" "}
            <strong className="text-primary">SEO optimization</strong>. I also
            have solid English communication skills, demonstrated by a{" "}
            <strong className="text-primary">TOEIC</strong>
            score of <strong className="text-primary">760/990</strong>.
          </p>
        </div>
        <div className="w-full lg:w-1/2 z-1">
          <img src="/skills.png" alt="Skills" className="w-full aspect-11/7" />
        </div>
      </div>
    </section>
  );
};
