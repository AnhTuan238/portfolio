import { SiGmail, SiZalo } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const iconContacts = [
  {
    label: "Gmail",
    href: "mailto:hoanhtuan23082003@gmail.com",
    Icon: SiGmail,
  },
  {
    label: "Zalo",
    href: "https://zalo.me/0941412299",
    Icon: SiZalo,
  },
  {
    label: "Github",
    href: "https://github.com/AnhTuan238",
    Icon: FaGithub,
  },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  return (
    <footer className="mt-20 w-full">
      <div className=" max-w-7xl mx-auto w-full px-6 lg:px-8">
        <div className="flex flex-col-reverse items-center justify-between gap-4 py-8 border-t border-gray-1 lg:flex-row">
          <p>
            © {currentYear} {t("designer")}
            <strong className="text-primary"> ANH TUAN</strong>
          </p>
          <ul className="flex gap-10">
            {iconContacts.map(({ href, Icon, label }) => {
              return (
                <li key={href}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={href}
                    aria-label={label}
                  >
                    <Icon
                      size={30}
                      className="hover:scale-120 hover:text-primary"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
};
