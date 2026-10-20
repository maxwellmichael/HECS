"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import GlassCard from "@/components/Common/GlassCard";
import { CatalogProduct } from "@/types/productCatalog";
import { CATEGORY_MEDIA } from "./categoryIcons";
import { SUBCATEGORY_ORDER } from "./productsData";

interface SingleProductCategoryProps {
  product: CatalogProduct;
  index?: number;
}

const SingleProductCategory = ({
  product,
  index = 0,
}: SingleProductCategoryProps) => {
  const media = CATEGORY_MEDIA[product.id];
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <GlassCard index={index} density="float" glow className="p-0">
      {/* ---- Media zone ---- */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {!imageFailed ? (
          <Image
            src={media.image}
            alt={`${product.name} components`}
            fill
            quality={75}
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 450px"
            onError={() => setImageFailed(true)}
            className="object-cover contrast-[0.98] saturate-[0.92] transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Branded fallback if the photo is missing */
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary via-primaryho to-blacksection dark:from-blacksection dark:via-blackho dark:to-black"
          >
            <span className="text-hero text-white/40">{media.icon}</span>
          </div>
        )}

        {/* Dark-mode-only veil */}
        <div
          aria-hidden
          className="absolute inset-0 hidden bg-gradient-to-b from-black/10 via-black/5 to-black/25 dark:block"
        />

        {/* Bottom scrim */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
        />

        {/* Editorial index numeral — frosted pill */}
        <span
          aria-hidden
          className="bg-black/15 absolute left-3 top-3 inline-flex h-8 min-w-[3rem] items-center justify-center rounded-full border border-white/10 px-2.5 text-metatitle font-bold tracking-widest text-white/90 backdrop-blur"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* ---- Content ---- */}
      <div className="flex flex-1 flex-col px-5 pb-5 md:px-6 md:pb-6">
        {/* Icon badge straddling the image seam */}
        <span className="relative z-10 -mt-6 mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/60 bg-white/70 text-regular text-primaryho shadow-solid-5 backdrop-blur-xl dark:border-white/10 dark:bg-blacksection/70 dark:text-primaryLight">
          {media.icon}
        </span>

        <h3 className="text-itemtitle font-bold text-black dark:text-white">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sectiontitle text-waterloo dark:text-manatee">
          {product.summary}
        </p>

        {/* Subcategory chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          {SUBCATEGORY_ORDER.map((sub) => (
            <span
              key={sub.key}
              className="rounded-full bg-stroke px-2.5 py-0.5 text-metatitle font-medium text-waterloo dark:bg-hoverdark dark:text-manatee"
            >
              {sub.label}
            </span>
          ))}
        </div>

        {/* Pinned footer link */}
        <Link
          href={`/products/${product.id}`}
          className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sectiontitle font-semibold text-primaryho underline-offset-4 transition-colors duration-300 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho dark:text-primaryLight dark:hover:text-primaryho"
        >
          View products
          <FaChevronRight
            aria-hidden
            className="h-2.5 w-2.5 transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </GlassCard>
  );
};

export default SingleProductCategory;
