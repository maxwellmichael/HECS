"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      type="button"
      aria-label="Toggle color scheme"
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-stroke text-black transition-colors duration-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho dark:bg-hoverdark dark:text-white dark:hover:bg-blackho"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Image
        src="/images/icon/icon-moon.svg"
        alt="moon"
        width={20}
        height={20}
        className="dark:hidden"
      />
      <Image
        src="/images/icon/icon-sun.svg"
        alt="sun"
        width={20}
        height={20}
        className="hidden dark:block"
      />
    </button>
  );
};

export default ThemeToggler;
