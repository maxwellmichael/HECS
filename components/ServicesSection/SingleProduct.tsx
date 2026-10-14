"use client";

import React from "react";
import Image from "next/image";
import type { Service } from "@/types/feature";
import GlassCard from "@/components/Common/GlassCard";

interface SingleProductProps {
  product: Service;
  index?: number;
}

const SingleProduct = ({ product, index = 0 }: SingleProductProps) => {
  return (
    <GlassCard index={index} density="float" hover={false} className="p-0">
      {/* Photo — flush to the glass frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {/* Soft blend: photo fades into the frosted footer instead of a hard edge */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/50 to-transparent dark:from-blacksection/50"
        />
      </div>

      {/* Subtle title resting on the glass */}
      <div className="flex items-center gap-2.5 border-t border-white/40 px-5 py-4 dark:border-white/10">
        <span
          aria-hidden
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary dark:bg-primaryho"
        />
        <h3 className="truncate text-regular font-medium text-blackho dark:text-white">
          {product.title}
        </h3>
      </div>
    </GlassCard>
  );
};

export default SingleProduct;
