"use client";

import React from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  density?: "float" | "read"; // float = image-led · read = text/form-led
  tint?: string; // e.g. "from-primaryho/15"
  glow?: boolean; // brand glow orb on hover
  index?: number; // grid position → stagger delay
  hover?: boolean; // hover lift (default true)
  blur?: "xl" | "2xl"; // xl for grids · 2xl for hero surfaces
  className?: string;
  children: React.ReactNode;
}

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const GlassCard = ({
  density = "float",
  tint,
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
      transition={{ duration: 0.3, delay: index * 0.05, ease: EASE }}
      whileHover={hover ? { y: -4 } : undefined}
      className={`group relative overflow-hidden rounded-2xl border border-stroke shadow-solid-2 transition-[border-color,box-shadow,background-color] duration-300 dark:border-white/10 ${
        hover
          ? "hover:border-primary/30 hover:shadow-solid-5 dark:hover:border-primaryho/40 dark:hover:shadow-solid-5"
          : ""
      } ${
        density === "read"
          ? "bg-white/85 dark:bg-blacksection/90"
          : "bg-white/55 dark:bg-white/5"
      } ${
        blur === "2xl" ? "backdrop-blur-2xl" : "backdrop-blur-xl"
      } backdrop-saturate-150 ${className}`}
    >
      {/* Colour tint */}
      {tint && (
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${tint} to-transparent`}
        />
      )}

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

      {/* Hover glow orb */}
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 right-0 h-24 w-24 rounded-full bg-primaryho/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 dark:bg-primaryho/25"
        />
      )}

      {/* Content */}
      <div className="relative flex h-full flex-col">{children}</div>
    </motion.div>
  );
};

export default GlassCard;
