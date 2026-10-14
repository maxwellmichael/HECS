"use client";

import React from "react";
import Image from "next/image";
import type { Feature } from "@/types/feature";
import GlassCard from "@/components/Common/GlassCard";

interface SingleFeatureProps {
  feature: Feature;
  index?: number;
}

const SingleFeature = ({ feature, index = 0 }: SingleFeatureProps) => {
  return (
    <GlassCard
      index={index}
      density="read"
      glow
      className="p-6 text-center md:p-7.5"
    >
      {/* Centred glass icon badge — mx-auto keeps it aligned with the centred text */}
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-white/60 bg-white/60 shadow-solid-12 dark:border-white/10 dark:bg-white/10">
        <Image
          src={feature.icon}
          alt={feature.title}
          width={54}
          height={54}
          className="h-8 w-8 object-contain md:h-9 md:w-9"
        />
      </span>

      <h3 className="mt-6 text-itemtitle font-bold text-black dark:text-white">
        {feature.title}
      </h3>
      <p className="mt-3 text-regular text-waterloo dark:text-manatee">
        {feature.description}
      </p>
    </GlassCard>
  );
};

export default SingleFeature;
