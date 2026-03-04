import { SiGmail, SiZalo } from "react-icons/si";
import { FaGithub } from "react-icons/fa";

const iconContacts = [
  {
    label: "Gmail",
    href: "mailto:hoanhtuan23082003@gmail.com",
    icon: <SiGmail size={30} />,
  },
  {
    label: "Zalo",
    href: "https://zalo.me/0941412299",
    icon: <SiZalo size={30} />,
  },
  {
    label: "Github",
    href: "https://github.com/AnhTuan238",
    icon: <FaGithub size={30} />,
  },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-20 w-full">
      <div className=" max-w-7xl mx-auto w-full px-6 lg:px-8">
        <div className="flex flex-col-reverse items-center justify-between gap-4 py-8 border-t border-gray-1 lg:flex-row">
          <p>
            {" "}
            © {currentYear} Made & designed by{" "}
            <strong className="text-primary">ANH TUAN</strong>
          </p>
          <ul className="flex gap-10">
            {iconContacts.map((icon) => {
              return (
                <li key={icon.href}>
                  <a target="_blank" rel="noopener noreferrer" href={icon.href}>
                    {icon.icon}
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
