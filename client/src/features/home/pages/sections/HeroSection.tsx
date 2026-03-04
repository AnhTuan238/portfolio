import { useScroll } from "@/features/home/hooks/useScroll";

export const Hero = () => {
  const { isScroll } = useScroll();

  return (
    <section id="mvArea">
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

      <section className={`z-2 relative w-full h-125 lg:h-screen`}>
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
            isScroll ? "h-30 lg:w-4/5 lg:h-90" : " w-full h-full"
          } hero relative  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 overflow-hidden`}
        >
          <div className="absolute inset-0 bg-black/60 z-10"></div>

          <img
            src="/banner-1.jpg"
            alt="banner"
            className="absolute top-0 size-full animate-fade object-top"
          />

          <img
            src="/banner-2.jpg"
            alt="banner"
            className="absolute top-0 size-full animate-fade [animation-delay:5s] object-top"
          />
        </div>
      </section>
    </section>
  );
};
