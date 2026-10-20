"use client";

import React from "react";

interface GlassPanelProps {
  density?: "float" | "read";
  tint?: string;
  className?: string;
  children: React.ReactNode;
}

const GlassPanel = ({
  density = "float",
  tint,
  className = "",
  children,
}: GlassPanelProps) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-stroke shadow-solid-2 backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 ${
        density === "read"
          ? "bg-white/85 dark:bg-blacksection/90"
          : "bg-white/55 dark:bg-white/5"
      } ${className}`}
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

      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  );
};

export default GlassPanel;
