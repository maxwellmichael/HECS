"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaClock, FaEnvelope, FaPhone } from "react-icons/fa";
import Button from "@/components/Common/Button";
import GlassPanel from "@/components/Common/GlassPanel";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const itemAnim = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: EASE },
});

const ContactHero = () => {
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
                  src="/images/contact/contact.jpg"
                  alt="Industrial control room supported by Heliac Energii Controls Solutions"
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
                    Contact Us
                  </motion.span> */}

                  <motion.h1
                    {...itemAnim(0.25)}
                    className="mt-4 text-itemtitle2 font-bold leading-tight text-white drop-shadow-md md:text-hero"
                  >
                    Let&apos;s Source Your{" "}
                    <span className="bg-gradient-to-r from-white via-white to-primaryLight bg-clip-text text-transparent">
                      Next Component
                    </span>
                  </motion.h1>

                  <motion.p
                    {...itemAnim(0.35)}
                    className="mt-3 max-w-xl text-sectiontitle text-white/90 drop-shadow md:mt-4 md:text-metatitle2"
                  >
                    Questions about spares, repairs or buy-backs? Our team
                    answers every enquiry within one business day.
                  </motion.p>

                  {/* <motion.div
                    {...itemAnim(0.45)}
                    className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
                  >
                    <Button
                      href="#message-form"
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      Send a Message
                    </Button>
                    <Button
                      href="mailto:inquiry@heliacenergii.com"
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      Email Us
                    </Button>
                  </motion.div> */}
                </div>
              </div>
            </div>
          </div>

          {/* ---- Overlapping quick-contact bar ---- */}
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
                <a
                  href="mailto:inquiry@heliacenergii.com"
                  className="flex items-center justify-between gap-3 px-5 py-4 transition-colors duration-300 hover:bg-primary/5 dark:hover:bg-white/5 sm:flex-col sm:justify-center sm:gap-2 sm:py-6"
                >
                  <span className="dark:bg-primaryho/15 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primaryho/10 text-regular text-primaryho dark:text-primaryLight">
                    <FaEnvelope aria-hidden />
                  </span>
                  <span className="min-w-0 text-right sm:text-center">
                    <span className="block truncate text-sectiontitle font-semibold text-black dark:text-white">
                      inquiry@heliacenergii.com
                    </span>
                    <span className="block text-metatitle font-semibold uppercase tracking-widest text-waterloo dark:text-manatee">
                      Email Us
                    </span>
                  </span>
                </a>

                <a
                  href="tel:+918411981840"
                  className="flex items-center justify-between gap-3 px-5 py-4 transition-colors duration-300 hover:bg-primary/5 dark:hover:bg-white/5 sm:flex-col sm:justify-center sm:gap-2 sm:py-6"
                >
                  <span className="dark:bg-primaryho/15 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primaryho/10 text-regular text-primaryho dark:text-primaryLight">
                    <FaPhone aria-hidden />
                  </span>
                  <span className="min-w-0 text-right sm:text-center">
                    <span className="block truncate text-sectiontitle font-semibold text-black dark:text-white">
                      0091-8411981840
                    </span>
                    <span className="block text-metatitle font-semibold uppercase tracking-widest text-waterloo dark:text-manatee">
                      Call Us
                    </span>
                  </span>
                </a>

                <div className="flex items-center justify-between gap-3 px-5 py-4 sm:flex-col sm:justify-center sm:gap-2 sm:py-6">
                  <span className="dark:bg-meta/15 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-meta/10 text-regular text-meta dark:text-meta">
                    <FaClock aria-hidden />
                  </span>
                  <span className="min-w-0 text-right sm:text-center">
                    <span className="block text-sectiontitle font-semibold text-black dark:text-white">
                      Within 24 Hours
                    </span>
                    <span className="block text-metatitle font-semibold uppercase tracking-widest text-waterloo dark:text-manatee">
                      Response Time
                    </span>
                  </span>
                </div>
              </div>
            </GlassPanel>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
