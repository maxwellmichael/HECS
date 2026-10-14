"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface SingleBrandProps {
  name: string;
  logoImagepath: string;
  productCount: number;
  selected: boolean;
  index: number;
  onClick: () => void;
}

const SingleBrand = ({
  name,
  logoImagepath,
  productCount,
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
      className={`group relative flex w-40 shrink-0 snap-start flex-col items-center gap-3 overflow-hidden rounded-2xl border px-4 pb-4 pt-5 transition-[border-color,background-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho sm:w-44 ${
        selected
          ? "border-primary bg-primary/10 shadow-solid-5 dark:border-primaryho dark:bg-primaryho/15"
          : "border-white/60 bg-white/50 hover:border-primary/30 hover:bg-white/70 hover:shadow-solid-4 dark:border-white/10 dark:bg-white/5 dark:hover:border-primaryho/30 dark:hover:bg-white/10"
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

      {/* Fixed-height logo zone — every name starts on the same baseline */}
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

      {/* Brand name — single line, truncated, centred */}
      <span
        className={`w-full truncate text-center text-metatitle font-semibold transition-colors duration-300 ${
          selected
            ? "text-primary dark:text-primaryLight"
            : "text-black dark:text-white"
        }`}
      >
        {name}
      </span>

      {/* Product pill — mt-auto pins it to a shared bottom edge across the row */}
      <span
        className={`mt-auto whitespace-nowrap rounded-full px-2.5 py-1 text-metatitle font-medium transition-colors duration-300 ${
          selected
            ? "bg-primary/20 text-primary dark:bg-primaryho/20 dark:text-primaryLight"
            : "bg-stroke text-waterloo dark:bg-hoverdark dark:text-manatee"
        }`}
      >
        {productCount} products
      </span>
    </motion.button>
  );
};

export default SingleBrand;