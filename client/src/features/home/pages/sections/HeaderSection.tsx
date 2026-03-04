import { IoMdArrowDropdown } from "react-icons/io";
import { AiOutlineGlobal } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import { useScroll } from "@/features/home/hooks/useScroll";
import { Nav } from "./NavSection";

const languageList = [
  {
    code: "en",
  },
  {
    code: "vi",
  },
];

const LocaleSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative text-sm">
      <button
        className="flex gap-1 items-center text-white font-extrabold cursor-pointer lg:text-black-1"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <AiOutlineGlobal className="size-6" />

        <span className="text-sm  uppercase">{i18n.language}</span>

        <IoMdArrowDropdown className="size-2.5" />
      </button>

      {isOpen && (
        <ul className="absolute top-9 flex flex-col gap-3 py-4 px-6 bg-white border border-black-1 text-center uppercase font-bold">
          {languageList.map((lang) => {
            return (
              <li
                key={lang.code}
                className={`${
                  i18n.language === lang.code ? "text-black-1" : "text-gray-3"
                } cursor-pointer`}
                onClick={() => {
                  setIsOpen(false);
                  i18n.changeLanguage(lang.code);
                }}
              >
                {lang.code}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export const Header = () => {
  const { isScroll } = useScroll();
  return (
    <header
      className={`${
        isScroll ? "hidden" : ""
      }  lg:animate-header fixed top-0 w-full border-gray-1 bg-transparent lg:bg-white lg:block lg:border-b z-4`}
    >
      <div className="flex justify-between items-center px-6 py-4.5 lg:px-8">
        <h1 className=" text-xl font-bold text-white lg:text-black lg:text-2xl">
          <a href="/">ANHTUAN</a>
        </h1>

        <Nav className="hidden lg:block" />

        <LocaleSwitcher />
      </div>
    </header>
  );
};
