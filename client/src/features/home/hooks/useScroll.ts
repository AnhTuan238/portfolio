import { useState, useEffect } from "react";

export const useScroll = () => {
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 10 ? setIsScroll(true) : setIsScroll(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return {
    isScroll,
  };
};
