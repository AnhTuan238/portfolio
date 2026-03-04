import { useScroll } from "../../hooks/useScroll";

export const Hero = () => {
  const { isScroll } = useScroll();

  return (
    <section className="relative lg:before:content-[''] lg:before:bg-primary lg:before:z-100 lg:before:absolute lg:before:text-right lg:before:top-1/2 lg:before:left-1/2 lg:before:-translate-x-1/2 lg:before:-translate-y-1/2 lg:before:opacity-0 lg:before:w-180 lg:before:h-40 lg:before:animate-box lg:after:content-['HELLO'] lg:after:text-white lg:after:text-5xl lg:after:font-bold lg:after:flex lg:after:items-center lg:after:justify-end lg:after:pr-5 lg:after:z-101 lg:after:animate-text-in-box lg:after:absolute lg:after:top-1/2 lg:after:left-1/2 lg:after:-translate-x-1/2 lg:after:-translate-y-1/2 lg:after:opacity-0 lg:after:w-180 lg:after:h-40">
      <div
        className={`${
          isScroll ? "opacity-100" : "opacity-0"
        } absolute z-3 top-56 lg:top-[calc(240px+50vh)] left-1/2 -translate-x-1/2 text-center w-full`}
      >
        <h2 className="text-white font-bold text-4xl lg:text-[70px] lg:text-black-1 mb-5">
          I'M TUAN
        </h2>
        <p className="mt-18 font-medium text-sm text-center lg:text-xl text-gray-2 lg:mt-0">
          Writing code is simple,
          <br />
          but writing simple code is incredibly hard
        </p>
      </div>

      <div className="z-2 relative  h-125 lg:h-screen">
        <div
          className={`${
            isScroll ? "opacity-0" : "opacity-100"
          } z-1 absolute flex flex-col justify-center left-5 bottom-0 h-full text-white font-bold lg:left-36`}
        >
          <h2 className="text-[50px] break-all lg:text-[140px]">I'M TUAN</h2>
          <p className="text-sm  indent-1 lg:indent-3 lg:text-[40px]">
            Welcome to my portfolio
          </p>
        </div>

        <div
          className={`${
            isScroll ? "h-30 lg:w-4/5 lg:h-90" : "w-full h-full"
          } lg:ease-in-out lg:animate-hero-container relative  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 overflow-hidden`}
        >
          <div className="absolute inset-0 bg-black/60 z-3"></div>

          <img
            src="/banner-1.webp"
            alt="banner"
            className="absolute top-0 size-full animate-fade object-top"
          />

          <img
            src="/banner-2.webp"
            alt="banner"
            className="absolute top-0 size-full animate-fade [animation-delay:5s] object-top"
          />
        </div>
      </div>
    </section>
  );
};
