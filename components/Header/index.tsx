"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import menuData from "./menuData";
import Button from "../Common/Button";
import BrochureButton from "./BrochureButton";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);

  const pathUrl = usePathname();
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // Sticky menu
  useEffect(() => {
    const handleStickyMenu = () => setStickyMenu(window.scrollY >= 80);
    window.addEventListener("scroll", handleStickyMenu);
    return () => window.removeEventListener("scroll", handleStickyMenu);
  }, []);

  // Return focus to the hamburger when the drawer closes
  useEffect(() => {
    if (wasOpen.current && !navigationOpen) hamburgerRef.current?.focus();
    wasOpen.current = navigationOpen;
  }, [navigationOpen]);

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-999 w-full py-2 transition-all duration-300 ease-in-out ${
          stickyMenu || navigationOpen
            ? "border-b border-white/60 bg-white/75 shadow-solid-5 backdrop-blur-2xl backdrop-saturate-150 dark:border-white/10 dark:bg-blacksection/75"
            : "border-b border-transparent"
        }`}
      >
        <div className="relative mx-auto max-w-c-1390 items-center justify-between px-4 md:px-8 xl:flex 2xl:px-0">
          <div className="flex w-full items-center justify-between xl:flex xl:w-2/5 xl:justify-center">
            <a href="/">
              <div className="relative h-[74px] w-[74px] md:h-[86px] md:w-[86px]">
                <Image
                  src="/images/logo/logo.png"
                  alt="logo"
                  fill
                  sizes="86px"
                  className="hidden object-contain dark:block"
                />
                <Image
                  src="/images/logo/logo.png"
                  alt="logo"
                  fill
                  sizes="86px"
                  className="relative object-contain dark:hidden"
                />
              </div>
            </a>

            {/* <!-- Hamburger Toggle BTN --> */}
            <button
              ref={hamburgerRef}
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={navigationOpen}
              aria-controls="mobile-menu"
              className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho xl:hidden"
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

          {/* Desktop nav — unchanged */}
          <div className="hidden items-center justify-between gap-6 xl:flex">
            <nav>
              <ul className="flex items-center gap-3">
                {menuData.map((menuItem) => (
                  <li key={menuItem.id}>
                    <Button
                      href={`${menuItem.path}`}
                      variant="ghost"
                      size="sm"
                      className={`rounded-full ${
                        pathUrl === menuItem.path
                          ? "bg-primary text-white hover:bg-primaryho hover:text-white"
                          : ""
                      }`}
                    >
                      {menuItem.title}
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-6">
              <Button href="/contact" variant="primary" size="lg">
                Inquiry
              </Button>
              <BrochureButton />
            </div>
          </div>
        </div>
      </header>
      {/* Mobile glass drawer */}
      <MobileMenu
        open={navigationOpen}
        onClose={() => setNavigationOpen(false)}
      />
    </>
  );
};

export default Header;
