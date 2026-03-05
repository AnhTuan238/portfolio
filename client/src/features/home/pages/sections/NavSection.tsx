import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const links = [
  { label: "about" },
  { label: "projects" },
  { label: "experience" },
];

export const NavSection = ({ className }: { className?: string }) => {
  const { t } = useTranslation();

  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const underlineRef = useRef<HTMLDivElement>(null);
  const isClickingRef = useRef(false);

  const moveUnderline = (index: number) => {
    const currentLink = navItemRefs.current[index];
    const underline = underlineRef.current;

    if (!currentLink || !underline) return;

    underline.style.width = `${currentLink.offsetWidth}px`;
    underline.style.left = `${currentLink.offsetLeft}px`;
  };

  useEffect(() => {
    moveUnderline(0);

    const handleResize = () => moveUnderline(0);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [t]);

  useEffect(() => {
    const sections = links
      .map((item) => document.getElementById(item.label))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickingRef.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.findIndex(
              (sec) => sec.id === entry.target.id,
            );
            if (index !== -1) {
              moveUnderline(index);
            }
          }
        });
      },
      {
        threshold: 0.2,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`flex items-center justify-center text-sm font-bold lg:text-base  ${className}`}
    >
      <ul className="relative flex items-center gap-5 lg:gap-20">
        {links.map((item, index) => (
          <li key={item.label} className="py-7 lg:py-2">
            <a
              href={`#${item.label}`}
              ref={(el) => {
                navItemRefs.current[index] = el;
              }}
              onClick={() => {
                isClickingRef.current = true;
                moveUnderline(index);

                setTimeout(() => {
                  isClickingRef.current = false;
                }, 500);
              }}
              className="py-2"
            >
              {t(item.label)}
            </a>
          </li>
        ))}

        <span
          ref={underlineRef}
          className="absolute bottom-0 h-1 bg-black-1 transition-all duration-300"
        />
      </ul>
    </nav>
  );
};
