import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Trans, useTranslation } from "react-i18next";

const AccordionItem = ({
  companyKey = "",
  roleKey = "",
  timeKey = "",
  descriptionKey = "",
}: {
  companyKey?: string;
  roleKey?: string;
  timeKey?: string;
  descriptionKey?: string;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useTranslation();
  return (
    <div className="rounded-2xl bg-gray-4 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left p-4 text-xl font-bold cursor-pointer lg:text-2xl"
      >
        {t(companyKey)}
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
          <p className="pt-4 mb-1 text-lg font-bold lg:text-xl">{t(roleKey)}</p>
          <time className="mb-2 text-base font-bold">{t(timeKey)}</time>
          <p className="mt-4 pb-6 text-lg">{t(descriptionKey)}</p>
        </div>
      </div>
    </div>
  );
};

export const ExperienceSection = () => {
  const { t } = useTranslation();

  return (
    <section id="experience" className="w-full scroll-mt-19 pt-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-black-1 lg:text-[70px] mb-5">
            {t("experience")}
          </h2>
          <p className="font-medium text-sm text-gray-2 lg:text-xl">
            <Trans i18nKey="experienceSection.description" />
          </p>
        </div>

        <div className="mt-15 space-y-8">
          <AccordionItem
            companyKey="experienceSection.hcmute.company"
            roleKey="experienceSection.hcmute.role"
            timeKey="experienceSection.hcmute.time"
            descriptionKey="experienceSection.hcmute.description"
          />

          <AccordionItem
            companyKey="experienceSection.adsagency.company"
            roleKey="experienceSection.adsagency.role"
            timeKey="experienceSection.adsagency.time"
            descriptionKey="experienceSection.adsagency.description"
          />
        </div>
      </div>
    </section>
  );
};
