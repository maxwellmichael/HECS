"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaDownload } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/Common/Button";
import GlassPanel from "@/components/Common/GlassPanel";
import { useBrochureDownloads } from "./useBrochureDownloads";

/** True only on devices with a real hover pointer (mouse / trackpad). */
const useCanHover = () => {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();

    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }
    // Safari < 14 fallback
    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  return canHover;
};

interface BrochureButtonProps {
  className?: string;
}

const BrochureButton = ({ className = "" }: BrochureButtonProps) => {
  const { brochures, handleDownloadAll, handleDownloadSingle } =
    useBrochureDownloads();
  const canHover = useCanHover();
  const [isHovered, setIsHovered] = useState(false);

  // Dropdown is a hover-only affordance — never render it on touch devices
  const showDropdown = canHover && isHovered;

  return (
    <div
      className="relative"
      onMouseEnter={() => canHover && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDownloadAll}
        ariaLabel="Download all brochures (PDF)"
        iconPosition="left"
        className={`group/brochure gap-2.5 border-2 border-primary bg-zumthor text-primary hover:border-zumthor hover:!bg-primary hover:text-white hover:shadow-solid-5 dark:bg-blackho dark:text-white dark:hover:!bg-primaryho dark:hover:text-white ${className}`.trim()}
        icon={
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-white transition-all duration-300 group-hover/brochure:bg-white group-hover/brochure:text-primary dark:bg-primaryho dark:group-hover/brochure:bg-white dark:group-hover/brochure:text-primaryho">
            <FaDownload
              aria-hidden
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover/brochure:translate-y-0.5"
            />
          </span>
        }
      >
        <span className="flex items-center gap-2">Brochures</span>
      </Button>

      {/* Hover preview dropdown — desktop pointers only */}
      <AnimatePresence>
        {showDropdown && (
          <div className="absolute right-0 top-full z-[1000] mt-4">
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="relative origin-top-right"
            >
              {/* Brand glow tethered under the button */}
              <div className="pointer-events-none absolute -top-8 right-6 h-16 w-32 rounded-full bg-primary/30 blur-2xl dark:bg-primaryho/40" />

              <GlassPanel tint="from-primaryho/25" className="w-52 rounded-2xl">
                <div className="flex flex-col gap-3 p-3">
                  {brochures.map((brochure, index) => (
                    <motion.button
                      key={brochure.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      onClick={() => handleDownloadSingle(brochure)}
                      className="group/card relative w-full overflow-hidden rounded-xl border border-white/60 bg-white/90 p-2 shadow-solid-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-solid-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho dark:border-white/10 dark:bg-blackho/90"
                      aria-label={`Download ${brochure.title}`}
                    >
                      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-stroke dark:bg-strokedark">
                        <Image
                          src={brochure.previewImage}
                          alt={brochure.title}
                          fill
                          sizes="208px"
                          className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-primary/80 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
                          <FaDownload className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <p className="mt-2 truncate text-center text-xs font-semibold text-black dark:text-white">
                        {brochure.title}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </GlassPanel>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BrochureButton;
