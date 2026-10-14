"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronRight, FaDownload, FaTimes } from "react-icons/fa";
import Button from "../Common/Button";
import BrochureButton from "./BrochureButton";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import { useBrochureDownloads } from "./useBrochureDownloads";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const MobileMenu = ({ open, onClose }: MobileMenuProps) => {
  const pathUrl = usePathname();
  const { brochures, handleDownloadSingle } = useBrochureDownloads();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => closeRef.current?.focus(), 80);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Dimmed, blurred backdrop */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm xl:hidden"
          />

          {/* Centred sheet */}
          <div
            key="sheet"
            className="pointer-events-none fixed inset-0 z-[1000] flex flex-col items-center px-4 pb-4 pt-24 md:pt-28 xl:hidden"
          >
            <motion.button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="pointer-events-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/70 text-black shadow-solid-5 backdrop-blur-xl transition-colors duration-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho dark:border-white/10 dark:bg-blackho/70 dark:text-white dark:hover:bg-blackho"
            >
              <FaTimes aria-hidden />
            </motion.button>

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: 48, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 48, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="pointer-events-auto relative flex min-h-0 w-full max-w-[420px] flex-1 flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/75 shadow-solid-7 backdrop-blur-2xl backdrop-saturate-150 dark:border-white/10 dark:bg-blacksection/80"
            >
              {/* Glass optics */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl dark:bg-primaryho/25"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent dark:from-white/5"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/25"
              />

              <nav className="no-scrollbar relative min-h-0 flex-1 overflow-y-auto px-5 pb-5 pt-6">
                <ul className="flex flex-col gap-1">
                  {menuData.map((item, index) => {
                    const active = pathUrl === item.path;
                    return (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.15 + index * 0.05,
                          ease: [0.23, 1, 0.32, 1],
                        }}
                      >
                        <Button
                          href={item.path}
                          variant="ghost"
                          size="md"
                          onClick={onClose}
                          className={`w-full !justify-start rounded-xl ${
                            active ? "dark:bg-primaryho/15 bg-primary/10" : ""
                          }`}
                          icon={
                            <span
                              aria-hidden
                              className={`h-5 w-1 shrink-0 rounded-full ${
                                active
                                  ? "bg-primary dark:bg-primaryho"
                                  : "bg-transparent"
                              }`}
                            />
                          }
                        >
                          <span
                            className={`flex w-full items-center justify-between text-regular font-semibold uppercase tracking-wide ${
                              active
                                ? "text-primary dark:text-primaryLight"
                                : "text-black dark:text-white"
                            }`}
                          >
                            {item.title}
                            <FaChevronRight
                              aria-hidden
                              className="h-3 w-3 text-waterloo dark:text-manatee"
                            />
                          </span>
                        </Button>
                      </motion.li>
                    );
                  })}
                </ul>

                <div className="my-4 h-px bg-stroke dark:bg-strokedark" />

                {/* <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="flex items-center justify-between rounded-xl px-4.5 py-2.5"
                >
                  <span className="text-sectiontitle font-semibold uppercase tracking-wide text-black dark:text-white">
                    Appearance
                  </span>
                  <ThemeToggler />
                </motion.div> */}

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.45 }}
                  className="mt-4"
                >
                  <Button
                    href="/contact"
                    variant="primary"
                    size="lg"
                    onClick={onClose}
                    className="w-full"
                  >
                    Inquiry
                  </Button>
                </motion.div>

                {/* Brochure previews — always visible on touch (no hover gate) */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="mt-6"
                >
                  <div className="mb-3 flex items-center justify-between px-1">
                    <span className="text-metatitle font-medium uppercase tracking-widest text-waterloo dark:text-manatee">
                      Brochures
                    </span>
                    <span className="text-metatitle text-waterloo dark:text-manatee">
                      {brochures.length} PDFs
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {brochures.map((brochure, index) => (
                      <motion.button
                        key={brochure.id}
                        type="button"
                        onClick={() => handleDownloadSingle(brochure)}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.55 + index * 0.06,
                          ease: [0.23, 1, 0.32, 1],
                        }}
                        aria-label={`Download ${brochure.title}`}
                        className="relative overflow-hidden rounded-xl border border-white/60 bg-white/90 p-2 shadow-solid-3 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho active:scale-[0.97] dark:border-white/10 dark:bg-blackho/90"
                      >
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-stroke dark:bg-strokedark">
                          <Image
                            src={brochure.previewImage}
                            alt={brochure.title}
                            fill
                            sizes="(max-width: 420px) 50vw, 200px"
                            className="object-cover"
                          />
                          {/* Permanent download badge — touch has no hover */}
                          <span className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full border border-white/40 bg-primary/90 text-white shadow-solid-5 backdrop-blur-sm dark:border-white/20 dark:bg-primaryho/90">
                            <FaDownload aria-hidden className="h-3 w-3" />
                          </span>
                          <span
                            aria-hidden
                            className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 to-transparent"
                          />
                        </div>
                        <p className="mt-2 truncate text-center text-xs font-semibold text-black dark:text-white">
                          {brochure.title}
                        </p>
                      </motion.button>
                    ))}
                  </div>

                  {/* Download-all, same primitive as desktop */}
                  <div className="mt-3">
                    <BrochureButton className="w-full" />
                  </div>
                </motion.div>
              </nav>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default MobileMenu;
