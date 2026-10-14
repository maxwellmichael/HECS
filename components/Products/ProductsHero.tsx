"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/Common/Button";
import GlassPanel from "@/components/Common/GlassPanel";
import { catalogSummary } from "./productsData";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const heroStats = [
  { value: `${catalogSummary.product_categories}`, label: "Product Families" },
  { value: `${catalogSummary.total_listed_items}`, label: "Listed Components" },
  { value: `${catalogSummary.subcategories.length}`, label: "System Groups" },
];

const itemAnim = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: EASE },
});

const ProductsHero = () => {
  return (
    <section className="pt-[90px] md:pt-[102px]">
      <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <div className="relative">
          {/* ---- Hero frame ---- */}
          <div className="relative overflow-hidden rounded-2xl border border-white/60 shadow-solid-l dark:border-white/10">
            {/* Taller on mobile so stacked content never collides with the edges */}
            <div className="relative h-[500px] md:h-[520px] xl:h-[560px]">
              {/* Image — subtle settle zoom, ends fully visible */}
              <motion.div
                initial={{ scale: 1.06 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.4, ease: EASE }}
                className="absolute inset-0"
              >
                <Image
                  src="/images/products/products-hero.jpg"
                  alt="Industrial port at sunset with shipping containers, cranes and turbine components"
                  fill
                  priority
                  sizes="(max-width: 1390px) 100vw, 1390px"
                  className="object-cover object-center"
                />
              </motion.div>

              {/* Readability scrims */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent dark:from-blacksection/90 dark:via-blacksection/50 dark:to-transparent"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent dark:from-blacksection/70"
              />

              {/* Brand glow + specular rim */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 right-10 h-56 w-56 rounded-full bg-primaryho/25 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
              />

              {/* Content */}
              <div className="absolute inset-0 flex items-center px-5 pb-8 md:px-12 md:pb-16 lg:px-16">
                <div className="w-full max-w-2xl">
                  <motion.span
                    {...itemAnim(0.15)}
                    className="bg-white/15 inline-flex items-center gap-2 rounded-full border border-white/40 px-3.5 py-1 text-metatitle font-semibold uppercase tracking-widest text-white backdrop-blur-xl dark:border-white/20 dark:bg-blacksection/40"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-meta" />
                    Industrial Spare Parts Catalog
                  </motion.span>

                  {/* Smaller mobile scale — fewer wrapped lines */}
                  <motion.h1
                    {...itemAnim(0.25)}
                    className="mt-4 text-itemtitle2 font-bold leading-tight text-white drop-shadow-md md:text-hero"
                  >
                    Energy Solutions &{" "}
                    <span className="bg-gradient-to-r from-white via-white to-primaryLight bg-clip-text text-transparent">
                      Trading Products
                    </span>
                  </motion.h1>

                  <motion.p
                    {...itemAnim(0.35)}
                    className="mt-3 max-w-xl text-sectiontitle text-white/90 drop-shadow md:mt-4 md:text-metatitle2"
                  >
                    Turbine, compressor, generator and pump components —
                    sourced, stocked and supplied to keep the industrial world
                    running.
                  </motion.p>

                  {/* Full-width stacked CTAs on mobile, row from sm up */}
                  <motion.div
                    {...itemAnim(0.45)}
                    className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
                  >
                    <Button
                      href="#categories"
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      Browse Categories
                    </Button>
                    <Button
                      href="/contact"
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      Request a Quote
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* ---- Stat bar: below hero on mobile, overlapping from md up ---- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            className="relative z-10 mt-4 md:mx-10 md:-mt-12"
          >
            <GlassPanel
              density="read"
              tint="from-primaryho/15"
              className="rounded-2xl"
            >
              <div className="grid grid-cols-1 divide-y divide-stroke dark:divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between gap-4 px-5 py-3.5 sm:flex-col sm:justify-center sm:gap-1 sm:px-6 sm:py-6"
                  >
                    <p className="bg-gradient-to-b from-primary to-primaryho bg-clip-text text-metatitle2 font-bold text-transparent dark:from-white dark:to-primaryLight sm:text-sectiontitle3">
                      {stat.value}
                    </p>
                    <p className="text-right text-metatitle font-semibold uppercase tracking-widest text-waterloo dark:text-manatee sm:text-center">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductsHero;
