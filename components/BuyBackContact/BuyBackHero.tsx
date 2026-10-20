"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaBoxes, FaClock, FaHandshake } from "react-icons/fa";
import Button from "@/components/Common/Button";
import GlassPanel from "@/components/Common/GlassPanel";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const heroStats = [
  { icon: <FaHandshake aria-hidden />, value: "12", label: "Brands Handled" },
  { icon: <FaBoxes aria-hidden />, value: "6", label: "Asset Categories" },
  { icon: <FaClock aria-hidden />, value: "< 24h", label: "First Response" },
];

const itemAnim = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: EASE },
});

const BuyBackHero = () => {
  return (
    <section className="pt-[90px] md:pt-[102px]">
      <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <div className="relative">
          {/* ---- Hero frame ---- */}
          <div className="relative overflow-hidden rounded-2xl border border-white/60 shadow-solid-l dark:border-white/10">
            <div className="relative h-[500px] md:h-[520px] xl:h-[560px]">
              <motion.div
                initial={{ scale: 1.06 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.4, ease: EASE }}
                className="absolute inset-0"
              >
                <Image
                  src="/images/buyback/buyback.jpg"
                  alt="Crated industrial surplus components awaiting buy-back valuation"
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
              <div className="absolute inset-0 flex items-center px-5 pb-16 md:px-12 md:pb-20 lg:px-16">
                <div className="w-full max-w-2xl">
                  {/* <motion.span
                    {...itemAnim(0.15)}
                    className="bg-white/15 inline-flex items-center gap-2 rounded-full border border-white/40 px-3.5 py-1 text-metatitle font-semibold uppercase tracking-widest text-white backdrop-blur-xl dark:border-white/20 dark:bg-blacksection/40"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-meta" />
                    Asset Recovery
                  </motion.span> */}

                  <motion.h1
                    {...itemAnim(0.25)}
                    className="mt-4 text-itemtitle2 font-bold leading-tight text-white drop-shadow-md md:text-hero"
                  >
                    Turn Surplus Stock into{" "}
                    <span className="bg-gradient-to-r from-white via-white to-primaryLight bg-clip-text text-transparent">
                      Working Capital.
                    </span>
                  </motion.h1>

                  <motion.p
                    {...itemAnim(0.35)}
                    className="mt-3 max-w-xl text-sectiontitle text-white/90 drop-shadow md:mt-4 md:text-metatitle2"
                  >
                    We buy back unused industrial spares — hydraulics,
                    pneumatics, electrical, instrumentation and automation —
                    from manufacturers, resellers and MRO teams worldwide.
                  </motion.p>

                  {/* <motion.div
                    {...itemAnim(0.45)}
                    className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
                  >
                    <Button
                      href="#buy-back-form"
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      Get a Valuation
                    </Button>
                    <Button
                      href="/brands"
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      Browse Brands
                    </Button>
                  </motion.div> */}
                </div>
              </div>
            </div>
          </div>

          {/* ---- Overlapping frosted stat bar ---- */}
          {/* <motion.div
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
                    className="flex items-center justify-between gap-3 px-5 py-4 sm:flex-col sm:justify-center sm:gap-2 sm:py-6"
                  >
                    <span className="dark:bg-primaryho/15 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primaryho/10 text-regular text-primaryho dark:text-primaryLight">
                      {stat.icon}
                    </span>
                    <span className="min-w-0 text-right sm:text-center">
                      <span className="block bg-gradient-to-b from-primary to-primaryho bg-clip-text text-metatitle2 font-bold text-transparent dark:from-white dark:to-primaryLight sm:text-sectiontitle3">
                        {stat.value}
                      </span>
                      <span className="block text-metatitle font-semibold uppercase tracking-widest text-waterloo dark:text-manatee">
                        {stat.label}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
};

export default BuyBackHero;
