"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import { Button } from "flowbite-react";
import { FaFileDownload } from "react-icons/fa";
import toast from "react-hot-toast";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);

  const pathUrl = usePathname();

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
  });

  const handleDownload = () => {
    // Path to the file in the public folder
    const fileUrl = "/downloads/brochure.pdf";

    // Create a temporary <a> element and trigger the download
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "brochure.pdf"; // Suggested file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`File Downloaded Successfully.`);
  };

  return (
    <header
      className={`fixed left-0 top-0 z-999 w-full py-2 ${
        stickyMenu
          ? "bg-[linear-gradient(#070d13b8,#070d133d)] bg-clip-padding text-white shadow backdrop-blur-[3rem] backdrop-filter  transition-all duration-300 ease-in-out"
          : ""
      }`}
    >
      <div className="relative mx-auto max-w-c-1390 items-center justify-between px-4 md:px-8 xl:flex 2xl:px-0">
        <div className="flex w-full items-center justify-between xl:flex xl:w-2/5 xl:justify-center">
          <a href="/">
            <div className="h-[74px] w-[74px] md:h-[86px] md:w-[86px] relative">
              <Image
                src="/images/logo/logo-dark.svg"
                alt="logo"
                width={119.03}
                height={30}
                className="hidden w-full dark:block"
              />
              <Image
                src="/images/logo/logo.png"
                alt="logo"
                layout="fill" // required
                objectFit="contain"
                className="relative dark:hidden"
              />
            </div>
          </a>

          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-label="hamburger Toggler"
            className="block xl:hidden"
            onClick={() => setNavigationOpen(!navigationOpen)}
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="absolute right-0 block h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "!w-full delay-300" : "w-0"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "delay-400 !w-full" : "w-0"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "!w-full delay-500" : "w-0"
                  }`}
                ></span>
              </span>
              <span className="du-block absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "!h-0 delay-[0]" : "h-full"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "!h-0 delay-200" : "h-0.5"
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}
        </div>

        {/* Nav Menu Start   */}
        <div
          className={`${
            navigationOpen
              ? "navbar !visible mt-4 h-auto max-h-[400px] rounded-md bg-white p-7.5 shadow-solid-5 dark:bg-blacksection xl:h-auto xl:p-0 xl:shadow-none xl:dark:bg-transparent"
              : "invisible h-0 w-full items-center justify-between xl:visible xl:flex xl:h-auto xl:w-full"
          }`}
        >
          <nav>
            <ul className="flex flex-col gap-5 xl:flex-row xl:items-center xl:gap-3">
              {menuData.map((menuItem, key) => (
                <li key={key} className={menuItem.submenu && "group relative"}>
                  {menuItem.submenu ? (
                    <>
                      <button
                        onClick={() => setDropdownToggler(!dropdownToggler)}
                        className="flex cursor-pointer items-center justify-between gap-3 hover:text-primary"
                      >
                        {menuItem.title}
                        <span>
                          <svg
                            className="h-3 w-3 cursor-pointer fill-waterloo group-hover:fill-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                          </svg>
                        </span>
                      </button>

                      <ul
                        className={`dropdown ${dropdownToggler ? "flex" : ""}`}
                      >
                        {menuItem.submenu.map((item, key) => (
                          <li key={key} className="hover:text-primary">
                            <Link href={item.path || "#"}>{item.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={`${menuItem.path}`}
                      className={` ${
                        pathUrl === menuItem.path
                          ? "bg-primary text-white hover:text-white"
                          : "hover:text-primary"
                      } duration-800 rounded-full px-6 py-1.5 text-black transition-all ease-in-out hover:bg-[#526ace] hover:text-white`}
                    >
                      {menuItem.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-7 flex items-center gap-6 xl:mt-0">
            {/* <ThemeToggler /> */}

            {/* <Link
              href="https://github.com/NextJSTemplates/solid-nextjs"
              className="text-regular font-medium text-waterloo hover:text-primary"
            >
              GitHub Repo 🌟
            </Link> */}

            <Link
              href="/contact"
              className="flex items-center justify-center rounded-full border border-white bg-primary px-7.5 py-2.5 text-regular text-white duration-300 ease-in-out hover:bg-primaryho"
            >
              Inquiry
            </Link>

            <Button
              pill
              gradientDuoTone="purpleToBlue"
              onClick={handleDownload}
            >
              <FaFileDownload className="mr-2 h-5 w-5" />
              Brochure
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

// w-full delay-300

export default Header;
