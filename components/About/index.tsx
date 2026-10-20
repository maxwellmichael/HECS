"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaComment,
  FaGlobeAmericas,
  FaMapMarkerAlt,
  FaSearch,
  FaShippingFast,
} from "react-icons/fa";
import Button from "@/components/Common/Button";
import GlassCard from "@/components/Common/GlassCard";
import SectionHeader from "@/components/Common/SectionHeader";
import Feature from "../Features";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const capabilities = [
  {
    number: "01",
    title: "Sourcing & Supply",
    description:
      "Premium hydraulics, instrumentation, automation, electrical and mechanical spares from the industry's top manufacturers — stocked and supplied worldwide.",
  },
  {
    number: "02",
    title: "Service & Repair",
    description:
      "Troubleshooting, servicing and repair of hydraulic & pneumatic systems, motors and drives — by engineers who know the equipment.",
  },
  {
    number: "03",
    title: "Asset Recovery",
    description:
      "Buy-back solutions that maximize the value of your surplus inventory and secure the highest return on investment.",
  },
];

const steps = [
  {
    step: "Step 01",
    icon: <FaComment aria-hidden />,
    title: "Enquiry & Specification",
    description:
      "Tell us what you need — part numbers, brands or applications — and our team scopes it within one business day.",
  },
  {
    step: "Step 02",
    icon: <FaSearch aria-hidden />,
    title: "Global Sourcing & Quote",
    description:
      "Our network of OEMs and trusted suppliers locates even hard-to-find components, with transparent, competitive quoting.",
  },
  {
    step: "Step 03",
    icon: <FaShippingFast aria-hidden />,
    title: "Delivery & After-Sales",
    description:
      "Checked, packed and shipped worldwide — backed by after-sales support, repairs and asset-recovery options.",
  },
];

const About = () => {
  const reduce = useReducedMotion() === true;

  return (
    <>
      {/* <!-- ===== Story widget Start ===== */}
      <section className="py-12 lg:py-16 xl:py-20">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="relative">
            {/* Contained decor — what the frost refracts */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
            >
              <motion.div
                className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-primaryho/20 blur-3xl dark:bg-primaryho/25"
                animate={
                  reduce
                    ? undefined
                    : { x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.12, 1] }
                }
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="bg-primary/15 absolute -bottom-24 -right-20 h-80 w-80 rounded-full blur-3xl dark:bg-primaryho/20"
                animate={
                  reduce
                    ? undefined
                    : { x: [0, -70, 0], y: [0, -40, 0], scale: [1.1, 1, 1.1] }
                }
                transition={{
                  duration: 22,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <Image
                fill
                sizes="100vw"
                src="/images/shape/shape-dotted-light.svg"
                alt=""
                className="absolute inset-0 opacity-40 dark:hidden"
              />
              <Image
                fill
                sizes="100vw"
                src="/images/shape/shape-dotted-dark.svg"
                alt=""
                className="absolute inset-0 hidden opacity-20 dark:block"
              />
            </div>

            {/* Glass surface */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative overflow-hidden rounded-2xl border border-stroke bg-white/40 shadow-solid-l backdrop-blur-2xl backdrop-saturate-150 dark:border-white/10 dark:bg-blacksection/50"
            >
              {/* Glass optics */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent dark:from-white/5"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/25"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/20 dark:ring-white/5"
              />

              <div className="relative grid grid-cols-1 lg:grid-cols-2">
                {/* Desktop vertical hairline at the zone seam */}
                <div
                  aria-hidden
                  className="dark:via-white/15 pointer-events-none absolute inset-y-10 left-1/2 hidden w-px bg-gradient-to-b from-transparent via-waterloo/30 to-transparent lg:block"
                />

                {/* ---- Narrative zone ---- */}
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
                  className="p-6 md:p-10 lg:p-12"
                >
                  {/* <span className="inline-flex items-center gap-2 rounded-full border border-stroke bg-white/50 px-4 py-1.5 text-metatitle font-semibold uppercase tracking-widest text-primaryho backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-primaryLight">
                    <span className="h-1.5 w-1.5 rounded-full bg-meta" />
                    About Heliac Energii
                  </span> */}

                  <h2 className="mt-5 text-sectiontitle4 font-bold leading-tight text-black dark:text-white md:text-sectiontitle3">
                    Powering the Future of{" "}
                    <span className="bg-gradient-to-r from-primary to-primaryho bg-clip-text text-transparent dark:from-white dark:to-primaryLight">
                      Industrial Innovation.
                    </span>
                  </h2>

                  <p className="mt-5 text-regular text-waterloo dark:text-manatee">
                    Heliac Energii Controls Solutions specializes in procuring
                    premium hydraulics, instrumentation, automation, electrical
                    and mechanical spares from industry-leading brands.
                  </p>
                  <p className="mt-4 text-regular text-waterloo dark:text-manatee">
                    From troubleshooting and servicing hydraulic & pneumatic
                    systems to motor repair and asset recovery, we deliver
                    innovative solutions, high-quality products and exceptional
                    expertise to keep your operations running.
                  </p>

                  {/* Numbered capabilities */}
                  <div className="mt-8 space-y-5">
                    {capabilities.map((cap, i) => (
                      <motion.div
                        key={cap.number}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: 0.2 + i * 0.08,
                          ease: EASE,
                        }}
                        className="flex items-start gap-4"
                      >
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-stroke bg-white/50 text-metatitle2 font-bold text-primaryho backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-primaryLight">
                          {cap.number}
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-metatitle3 font-semibold text-black dark:text-white">
                            {cap.title}
                          </h3>
                          <p className="mt-1 text-sectiontitle text-waterloo dark:text-manatee">
                            {cap.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Mobile: centred vertical hairline between zones */}
                <div aria-hidden className="flex justify-center py-4 lg:hidden">
                  <span className="h-16 w-px bg-gradient-to-b from-transparent via-waterloo/40 to-transparent dark:via-white/20" />
                </div>

                {/* ---- Image zone ---- */}
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.45, delay: 0.2, ease: EASE }}
                  className="p-6 pt-0 md:p-10 md:pt-0 lg:p-12 lg:pl-0"
                >
                  <div className="relative h-full min-h-[320px] overflow-hidden rounded-2xl border border-white/60 dark:border-white/10">
                    <motion.div
                      initial={{ scale: reduce ? 1 : 1.06 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: reduce ? 0 : 1.4, ease: EASE }}
                      className="absolute inset-0"
                    >
                      <Image
                        fill
                        sizes="(max-width: 1023px) 100vw, 50vw"
                        src="/images/about/routemap.jpg"
                        alt="Industrial automation components supplied by Heliac Energii Controls Solutions"
                        className="object-cover"
                      />
                    </motion.div>

                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                    />

                    {/* Floating frosted stat chips */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-xl border border-white/40 bg-white/20 px-4 py-2.5 backdrop-blur-xl dark:border-white/20 dark:bg-blacksection/40">
                      <FaGlobeAmericas
                        aria-hidden
                        className="text-regular text-white"
                      />
                      <span className="text-sectiontitle font-semibold text-white">
                        100+ World Wide Clients
                      </span>
                    </div>
                    <div className="absolute right-4 top-4 flex items-center gap-2.5 rounded-xl border border-white/40 bg-white/20 px-4 py-2.5 backdrop-blur-xl dark:border-white/20 dark:bg-blacksection/40">
                      <FaMapMarkerAlt
                        aria-hidden
                        className="text-regular text-white"
                      />
                      <span className="text-sectiontitle font-semibold text-white">
                        10+ Locations
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== Story widget End ===== */}
      <Feature />

      {/* <!-- ===== Process Start ===== */}
      <section className="pb-12 lg:pb-16 xl:pb-20">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <SectionHeader
            headerInfo={{
              title: "How We Work",
              subtitle: "From Enquiry to Delivery",
              description:
                "A simple, transparent process refined over years of keeping critical operations running.",
            }}
          />

          <div className="mt-12.5 grid grid-cols-1 gap-7.5 md:grid-cols-3 xl:gap-12.5">
            {steps.map((step, index) => (
              <GlassCard
                key={step.title}
                index={index}
                density="read"
                glow
                className="p-6 md:p-7.5"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="bg-primaryho/15 flex h-12 w-12 items-center justify-center rounded-xl text-regular text-primaryho dark:bg-primaryho/20 dark:text-primaryLight">
                    {step.icon}
                  </span>
                  <span className="text-metatitle font-semibold uppercase tracking-widest text-waterloo dark:text-manatee">
                    {step.step}
                  </span>
                </div>
                <h3 className="mt-5 text-itemtitle font-bold text-black dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sectiontitle text-waterloo dark:text-manatee">
                  {step.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      {/* <!-- ===== Process End ===== */}

      {/* <!-- ===== CTA Start ===== */}
      <section className="pb-20 lg:pb-25 xl:pb-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <GlassCard
              density="float"
              blur="2xl"
              tint="from-primaryho/20"
              glow
              hover={false}
              className="p-8 text-center md:p-14"
            >
              <h2 className="mx-auto max-w-2xl text-sectiontitle4 font-bold text-black dark:text-white md:text-sectiontitle3">
                Ready to power your operations?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-regular text-waterloo dark:text-manatee md:text-metatitle2">
                From hard-to-find spares to full asset recovery — partner with a
                team that keeps the industrial world running.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Get a Quote
                </Button>
                <Button
                  href="/products"
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  View Products
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
      {/* <!-- ===== CTA End ===== */}
    </>
  );
};

export default About;
