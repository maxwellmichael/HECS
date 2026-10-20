"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface SingleBrandProps {
  name: string;
  logoImagepath: string;
  selected: boolean;
  index: number;
  onClick: () => void;
}

const SingleBrand = ({
  name,
  logoImagepath,
  selected,
  index,
  onClick,
}: SingleBrandProps) => {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.04,
        ease: [0.23, 1, 0.32, 1],
      }}
      onClick={onClick}
      aria-pressed={selected}
      title={name}
      className={`group relative flex w-40 shrink-0 snap-start flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border px-4 py-5 transition-[border-color,background-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho sm:w-44 ${
        selected
          ? "dark:bg-primaryho/15 border-primary bg-primary/10 shadow-solid-5 dark:border-primaryho"
          : "border-stroke bg-white/50 hover:border-primary/30 hover:bg-white/70 hover:shadow-solid-4 dark:border-white/10 dark:bg-white/5 dark:hover:border-primaryho/30 dark:hover:bg-white/10"
      }`}
    >
      {/* Glass optics */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent dark:from-white/5"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/25"
      />

      {/* Fixed-height logo zone — keeps every name on the same baseline */}
      <span className="relative h-10 w-full">
        <Image
          src={logoImagepath}
          alt={`${name} logo`}
          fill
          sizes="144px"
          className={`object-contain transition-all duration-300 ${
            selected
              ? ""
              : "opacity-80 grayscale group-hover:opacity-100 group-hover:grayscale-0"
          }`}
        />
      </span>

      {/* Brand name */}
      <span
        className={`w-full truncate text-center text-metatitle font-semibold transition-colors duration-300 ${
          selected
            ? "text-primary dark:text-primaryLight"
            : "text-black dark:text-white"
        }`}
      >
        {name}
      </span>
    </motion.button>
  );
};

export default SingleBrand;
