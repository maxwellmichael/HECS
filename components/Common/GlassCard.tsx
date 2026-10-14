"use client";

import React from "react";
import { motion } from "framer-motion";

export type GlassDensity = "float" | "read";

interface GlassCardProps {
  /** float = image-led cards · read = text/form-led cards */
  density?: GlassDensity;
  /** Left-edge tint stop, e.g. "from-primaryho/25" */
  tint?: string;
  /** Brand glow orb revealed on hover (feature/service cards only) */
  glow?: boolean;
  /** Grid position → stagger delay (index * 0.05) */
  index?: number;
  /** Hover lift + shadow/border shift (default true) */
  hover?: boolean;
  /** xl for card grids (mobile GPU budget) · 2xl for hero surfaces */
  blur?: "xl" | "2xl";
  className?: string;
  children: React.ReactNode;
}

const densityClasses: Record<GlassDensity, string> = {
  float: "bg-white/40 dark:bg-blacksection/50",
  read: "bg-white/70 dark:bg-blacksection/80",
};

const blurClasses: Record<"xl" | "2xl", string> = {
  xl: "backdrop-blur-xl",
  "2xl": "backdrop-blur-2xl",
};

const GlassCard = ({
  density = "read",
  tint = "",
  glow = false,
  index = 0,
  hover = true,
  blur = "xl",
  className = "",
  children,
}: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: [0.23, 1, 0.32, 1],
      }}
      // Lift via framer (CSS translate would fight the inline transform)
      whileHover={hover ? { y: -4 } : undefined}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/60 shadow-solid-3 backdrop-saturate-150 transition-[border-color,box-shadow] duration-300 dark:border-white/10 dark:shadow-solid-6 ${
        blurClasses[blur]
      } ${densityClasses[density]} ${
        hover
          ? "hover:border-primary/30 hover:shadow-solid-5 dark:hover:border-primaryho/30"
          : ""
      } ${className}`}
    >
      {/* Top gloss */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent dark:from-white/5"
      />
      {/* Specular rim light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/25"
      />
      {/* Type tint */}
      {tint && (
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${tint} via-transparent to-transparent`}
        />
      )}
      {/* Hover glow */}
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-8 right-6 h-16 w-32 rounded-full bg-primary/20 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 dark:bg-primaryho/25"
        />
      )}
      <div className="relative flex h-full flex-col">{children}</div>
    </motion.div>
  );
};

export default GlassCard;
