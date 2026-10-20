"use client";

import { motion } from "framer-motion";
import { FaBox } from "react-icons/fa";

interface SingleProductProps {
  name: string;
  index: number;
}

const SingleProduct = ({ name, index }: SingleProductProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: 0.3,
        delay: index * 0.03,
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-xl border border-stroke bg-white/70 p-5 shadow-solid-3 backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 hover:border-primary/30 hover:shadow-solid-5 dark:border-white/10 dark:bg-blacksection/70"
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

      <div className="relative flex items-start gap-3">
        {/* Icon */}
        <span className="dark:bg-primaryho/15 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20 dark:text-primaryLight dark:group-hover:bg-primaryho/25">
          <FaBox className="h-4 w-4" />
        </span>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-sectiontitle font-semibold text-black transition-colors duration-300 dark:text-white">
            {name}
          </h3>
          <p className="mt-1 text-metatitle text-waterloo dark:text-manatee">
            Industrial Component
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SingleProduct;
