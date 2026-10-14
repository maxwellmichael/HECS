"use client";

import React from "react";

interface GlassPanelProps {
  /** Gradient origin stop for the type tint, e.g. "from-meta/25" */
  tint?: string;
  /** "float" = translucent HUD glass · "read" = higher opacity for text-heavy surfaces */
  density?: "float" | "read";
  className?: string;
  children: React.ReactNode;
}

const densityClasses: Record<"float" | "read", string> = {
  float: "bg-white/40 dark:bg-blacksection/50",
  read: "bg-white/70 dark:bg-blacksection/80",
};

const GlassPanel = ({
  tint = "",
  density = "float",
  className = "",
  children,
}: GlassPanelProps) => (
  <div
    className={`relative overflow-hidden border border-white/60 shadow-solid-7 backdrop-blur-2xl backdrop-saturate-150 dark:border-white/10 dark:shadow-solid-6 ${densityClasses[density]} ${className}`}
  >
    {tint && (
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${tint} via-transparent to-transparent`}
      />
    )}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent dark:from-white/5"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/25"
    />
    <div className="relative">{children}</div>
  </div>
);

export default GlassPanel;
