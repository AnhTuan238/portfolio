import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const AccordionItem = ({
  company,
  role,
  time,
  description,
}: {
  company?: string;
  role?: string;
  time?: string;
  description?: string;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="rounded-2xl bg-gray-4 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left p-4 text-xl font-bold cursor-pointer lg:text-2xl"
      >
        {company}
        <IoIosArrowDown
          className={`shrink-0
      transition-transform duration-300 
      ${isOpen ? "rotate-180" : "rotate-0"}
    `}
        />
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out
          ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }
        `}
      >
        <div className="overflow-hidden px-4 bg-gray-5">
          <p className="pt-4 mb-1 text-lg font-bold lg:text-xl">{role}</p>
          <time className="mb-2 text-base font-bold">{time}</time>
          <p className="pb-8 text-sm text-justify lg:text-lg">{description}</p>
        </div>
      </div>
    </div>
  );
};

export const ExperienceSection = () => {
  return (
    <section id="experience" className="w-full scroll-mt-19 pt-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-black-1 lg:text-[70px] mb-5">
            Experience
          </h2>
          <p className="font-medium text-sm text-gray-2 lg:text-xl">
            Shaped by hands-on experiences,
            <br />I transform ideas into real-world solutions through continuous
            learning and collaboration
          </p>
        </div>

        <div className="mt-15 space-y-8">
          <AccordionItem
            company="Ho Chi Minh City University of Technology and Education (HCMUTE)"
            role="Computer Engineering student"
            time="2021 - 2025"
            description="- Learned foundational knowledge in web development, embedded systems, and artificial intelligence (AI).
- Applied skills through practical projects, focusing on building smart systems and user-friendly applications."
          />
          <AccordionItem
            company="AdsAgency Vietnam Co., Ltd."
            role="Software Engineer Intern"
            time="Aug 2024 - Jan 2025"
            description="- Participated in the development of diverse websites, including e-commerce platforms and news portals, on the WordPress platform, ensuring compliance with UI/UX standards.
- Worked closely with the backend team to integrate APIs and enhance overall website performance."
          />
        </div>
      </div>
    </section>
  );
};
