"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";
import { Controller, useForm } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import toast from "react-hot-toast";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaBalanceScale,
  FaBolt,
  FaBoxes,
  FaBuilding,
  FaCheck,
  FaClipboardList,
  FaClock,
  FaComment,
  FaEnvelope,
  FaGem,
  FaHandshake,
  FaMicrochip,
  FaMobileAlt,
  FaOilCan,
  FaTag,
  FaTachometerAlt,
  FaTruck,
  FaUser,
  FaWind,
} from "react-icons/fa";
import ArrowIcon from "@/components/Common/ArrowIcon";
import Button from "@/components/Common/Button";
import GlassCard from "@/components/Common/GlassCard";
import GlassPanel from "@/components/Common/GlassPanel";
import SectionHeader from "@/components/Common/SectionHeader";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const inputClasses =
  "w-full rounded-xl border border-stroke bg-white/60 py-3.5 pl-11 pr-4 text-regular text-black placeholder:text-waterloo transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-strokedark dark:bg-white/5 dark:text-white dark:placeholder:text-manatee dark:focus:border-primaryho dark:focus:ring-primaryho/20";

const fieldIconClasses =
  "pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-waterloo dark:text-manatee";

const labelClasses =
  "mb-2 block text-metatitle font-semibold uppercase tracking-widest text-waterloo dark:text-manatee";

const errorClasses = "mt-1.5 text-metatitle text-red-600 dark:text-red-500";

const steps = [
  {
    step: "Step 01",
    icon: <FaClipboardList aria-hidden />,
    title: "Submit Your List",
    description:
      "Send brands, part numbers, quantities and condition through the form — stock sheets welcome.",
  },
  {
    step: "Step 02",
    icon: <FaBalanceScale aria-hidden />,
    title: "Get a Valuation",
    description:
      "We benchmark each line against live market demand and grade condition.",
  },
  {
    step: "Step 03",
    icon: <FaHandshake aria-hidden />,
    title: "Agree a Price",
    description:
      "You receive a transparent offer — accept, negotiate or decline, no obligation.",
  },
  {
    step: "Step 04",
    icon: <FaTruck aria-hidden />,
    title: "Ship & Get Paid",
    description:
      "We collect or receive your shipment and release payment on check-in.",
  },
];

const categories = [
  {
    icon: <FaOilCan aria-hidden />,
    title: "Hydraulics",
    description: "Pumps, valves, cylinders and power units.",
  },
  {
    icon: <FaWind aria-hidden />,
    title: "Pneumatics",
    description: "Actuators, FRL units, valves and fittings.",
  },
  {
    icon: <FaBolt aria-hidden />,
    title: "Electrical",
    description: "Motors, drives, switchgear and cabling.",
  },
  {
    icon: <FaTachometerAlt aria-hidden />,
    title: "Instrumentation",
    description: "Transmitters, sensors and analyzers.",
  },
  {
    icon: <FaMicrochip aria-hidden />,
    title: "Automation",
    description: "PLCs, HMIs, I/O and control cards.",
  },
  {
    icon: <FaBoxes aria-hidden />,
    title: "Industrial Spares",
    description: "Rotating equipment and mechanical spares.",
  },
];

const brandLogos = [
  { name: "Allen Bradley", path: "/images/brand/brand-01.svg" },
  { name: "Parker", path: "/images/brand/brand-02.svg" },
  { name: "Siemens", path: "/images/brand/brand-03.svg" },
  { name: "ABB", path: "/images/brand/brand-04.svg" },
  { name: "Omron", path: "/images/brand/brand-05.svg" },
  { name: "Schneider", path: "/images/brand/brand-06.svg" },
  { name: "Mitsubishi", path: "/images/brand/brand-07.svg" },
  { name: "Weidmuller", path: "/images/brand/brand-08.svg" },
  { name: "Beckhoff", path: "/images/brand/brand-09.svg" },
  { name: "Emerson", path: "/images/brand/brand-10.svg" },
  { name: "Woodward", path: "/images/brand/brand-11.svg" },
  { name: "Yokogawa", path: "/images/brand/brand-12.svg" },
];

const whyUs = [
  {
    icon: <FaBalanceScale aria-hidden />,
    title: "Fair Market Valuation",
    description:
      "Offers benchmarked against live market demand — not book value.",
  },
  {
    icon: <FaClock aria-hidden />,
    title: "Response Within 24 Hours",
    description:
      "A first valuation or clarifying question within one business day.",
  },
  {
    icon: <FaTruck aria-hidden />,
    title: "Flexible Logistics",
    description:
      "We arrange collection or accept your shipment — whichever suits your site.",
  },
  {
    icon: <FaHandshake aria-hidden />,
    title: "No Obligation",
    description: "Every quote is free to request and free to decline.",
  },
];

const GroupLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3">
    <span className="h-1.5 w-1.5 rounded-full bg-primaryho dark:bg-primaryLight" />
    <span className="text-metatitle font-semibold uppercase tracking-widest text-waterloo dark:text-manatee">
      {children}
    </span>
    <span aria-hidden className="h-px flex-1 bg-stroke dark:bg-white/10" />
  </div>
);

const BuyBackContact = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const [isLoading, setLoading] = useState(false);
  const reduce = useReducedMotion() === true;

  /* ---- FORM LOGIC — UNCHANGED (sendForm coupling preserved) ---- */
  const handleFormSubmit = (
    formData: any,
    event?: React.BaseSyntheticEvent,
  ) => {
    setLoading(true);
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_BUYBACK_TEMPLATE_ID,
        event?.currentTarget as HTMLFormElement,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY },
      )
      .then(
        () => {
          router.push("/");
          toast.success(
            "Thank you! Your message has been sent successfully. We'll get back to you shortly.",
          );
        },
        (error) => {
          console.log("FAILED...", error);
          toast.error("Oops! Something went wrong. Please try again later.");
        },
      )
      .finally(() => setLoading(false));
  };

  return (
    <>
      {/* <!-- ===== How it works Start ===== */}
      {/* <section className="py-12 lg:py-16 xl:py-20">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <SectionHeader
            headerInfo={{
              title: "How It Works",
              subtitle: "From Surplus to Settlement",
              description:
                "A simple four-step process that turns idle inventory into recovered value — with no obligation at any stage.",
            }}
          />

          <div className="mt-12.5 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {steps.map((step, index) => (
              <GlassCard
                key={step.title}
                index={index}
                density="read"
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
                <h3 className="mt-5 text-itemtitle2 font-bold text-black dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sectiontitle text-waterloo dark:text-manatee">
                  {step.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section> */}
      {/* <!-- ===== How it works End ===== */}

      {/* <!-- ===== What we buy Start ===== */}
      {/* <section className="pb-12 lg:pb-16 xl:pb-20">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <SectionHeader
            headerInfo={{
              title: "What We Buy",
              subtitle: "Surplus Categories",
              description:
                "Unused, excess or obsolete stock across every major industrial system — original packaging preferred but not required.",
            }}
          />

          <div className="mt-12.5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {categories.map((category, index) => (
              <GlassCard
                key={category.title}
                index={index}
                density="read"
                hover={false}
                className="p-5 md:p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="dark:bg-primaryho/15 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primaryho/10 text-regular text-primaryho dark:text-primaryLight">
                    {category.icon}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-regular font-semibold text-black dark:text-white">
                      {category.title}
                    </h3>
                    <p className="mt-1 text-sectiontitle text-waterloo dark:text-manatee">
                      {category.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section> */}
      {/* <!-- ===== What we buy End ===== */}

      {/* <!-- ===== Brands strip Start ===== */}
      <section className="py-12 lg:py-16 xl:py-20">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <GlassPanel
            density="float"
            tint="from-primaryho/10"
            className="rounded-2xl"
          >
            <div className="p-6 md:p-8">
              {/* ---- Infinite marquee ---- */}
              <div className="relative overflow-hidden [-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
                <div
                  className={`flex w-max ${
                    reduce
                      ? ""
                      : "animate-[brand-marquee_45s_linear_infinite] hover:[animation-play-state:paused]"
                  }`}
                >
                  {[0, 1].map((copy) => (
                    <div key={copy} aria-hidden={copy === 1} className="flex">
                      {brandLogos.map((brand) => (
                        <div
                          key={`${copy}-${brand.name}`}
                          className="mr-4 md:mr-6"
                        >
                          <div className="group/logo flex h-16 w-40 items-center justify-center rounded-xl border border-stroke bg-white/50 px-4 transition-colors duration-300 hover:border-primary/40 hover:bg-white/70 dark:border-white/10 dark:bg-white/5 dark:hover:border-primaryho/40 dark:hover:bg-white/10 md:w-44">
                            <Image
                              width={120}
                              height={48}
                              src={brand.path}
                              alt={copy === 0 ? brand.name : ""}
                              className="object-contain opacity-70 grayscale transition-all duration-300 group-hover/logo:opacity-100 group-hover/logo:grayscale-0"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassPanel>
        </div>
      </section>
      {/* <!-- ===== Brands strip End ===== */}

      {/* <!-- ===== Form widget Start ===== */}
      <section
        id="buy-back-form"
        className="scroll-mt-28 pb-20 lg:pb-25 xl:pb-30"
      >
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <SectionHeader
            headerInfo={{
              title: "Sell Your Surplus",
              subtitle: "Request a Buy-Back Valuation",
              description:
                "Transform your industrial surplus into value with our streamlined buyback solutions.",
            }}
          />

          <div className="relative mt-12.5">
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

              <div className="relative grid grid-cols-1 lg:grid-cols-5">
                {/* Desktop vertical hairline at the 3/5 seam */}
                <div
                  aria-hidden
                  className="dark:via-white/15 pointer-events-none absolute inset-y-10 left-[60%] hidden w-px bg-gradient-to-b from-transparent via-waterloo/30 to-transparent lg:block"
                />

                {/* ---- Form zone ---- */}
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
                  className="p-6 md:p-10 lg:col-span-3"
                >
                  <form
                    onSubmit={handleSubmit(handleFormSubmit, () =>
                      toast.error("Please fill in all required fields."),
                    )}
                  >
                    <fieldset disabled={isLoading} className="space-y-8">
                      {/* Group 1 — Your Details */}
                      <div>
                        <GroupLabel>Your Details</GroupLabel>
                        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <div>
                            <label htmlFor="fullName" className={labelClasses}>
                              Full Name *
                            </label>
                            <div className="relative">
                              <FaUser
                                aria-hidden
                                className={fieldIconClasses}
                              />
                              <input
                                id="fullName"
                                type="text"
                                placeholder="John Doe"
                                {...register("fullName", {
                                  required: "Full name is required.",
                                })}
                                className={`${inputClasses} ${
                                  errors.fullName ? "border-red-500" : ""
                                }`}
                              />
                            </div>
                            {errors.fullName && (
                              <p className={errorClasses}>
                                {String(errors.fullName.message)}
                              </p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="email" className={labelClasses}>
                              Email *
                            </label>
                            <div className="relative">
                              <FaEnvelope
                                aria-hidden
                                className={fieldIconClasses}
                              />
                              <input
                                id="email"
                                type="email"
                                placeholder="you@company.com"
                                {...register("email", {
                                  required: "Email is required.",
                                  pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message:
                                      "Please enter a valid email address.",
                                  },
                                })}
                                className={`${inputClasses} ${
                                  errors.email ? "border-red-500" : ""
                                }`}
                              />
                            </div>
                            {errors.email && (
                              <p className={errorClasses}>
                                {String(errors.email.message)}
                              </p>
                            )}
                          </div>

                          <div>
                            <label
                              htmlFor="companyName"
                              className={labelClasses}
                            >
                              Company Name *
                            </label>
                            <div className="relative">
                              <FaBuilding
                                aria-hidden
                                className={fieldIconClasses}
                              />
                              <input
                                id="companyName"
                                type="text"
                                placeholder="Your company"
                                {...register("companyName", {
                                  required: "Company name is required.",
                                })}
                                className={`${inputClasses} ${
                                  errors.companyName ? "border-red-500" : ""
                                }`}
                              />
                            </div>
                            {errors.companyName && (
                              <p className={errorClasses}>
                                {String(errors.companyName.message)}
                              </p>
                            )}
                          </div>

                          <div>
                            <label
                              htmlFor="phoneNumber"
                              className={labelClasses}
                            >
                              Phone Number *
                            </label>
                            <div className="relative">
                              <FaMobileAlt
                                aria-hidden
                                className={fieldIconClasses}
                              />
                              <Controller
                                name="phoneNumber"
                                control={control}
                                rules={{
                                  required: "Phone number is required.",
                                  validate: (value) =>
                                    isValidPhoneNumber(String(value)) ||
                                    "Please enter a valid phone number.",
                                }}
                                render={({ field }) => (
                                  <PhoneInput
                                    international
                                    defaultCountry="IN"
                                    autoFormat
                                    placeholder="Enter phone number"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full rounded-xl border border-stroke bg-white/60 transition-all duration-300 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 dark:border-strokedark dark:bg-white/5 dark:focus-within:border-primaryho dark:focus-within:ring-primaryho/20"
                                  />
                                )}
                              />
                            </div>
                            {errors.phoneNumber && (
                              <p className={errorClasses}>
                                {String(errors.phoneNumber.message)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Group 2 — Your Inventory */}
                      <div>
                        <GroupLabel>Your Inventory</GroupLabel>
                        <div className="mt-5 space-y-5">
                          <div>
                            <label htmlFor="brandName" className={labelClasses}>
                              Brand Name *
                            </label>
                            <div className="relative">
                              <FaTag aria-hidden className={fieldIconClasses} />
                              <input
                                id="brandName"
                                type="text"
                                placeholder="e.g. Allen Bradley, Siemens, Parker"
                                {...register("brandName", {
                                  required: "Brand name is required.",
                                })}
                                className={`${inputClasses} ${
                                  errors.brandName ? "border-red-500" : ""
                                }`}
                              />
                            </div>
                            {errors.brandName && (
                              <p className={errorClasses}>
                                {String(errors.brandName.message)}
                              </p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="message" className={labelClasses}>
                              Message 
                            </label>
                            <div className="relative">
                              <FaComment
                                aria-hidden
                                className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-waterloo dark:text-manatee"
                              />
                              <textarea
                                id="message"
                                rows={4}
                                placeholder="Stock details, Part numbers, quantities — anything that helps us value your stock."
                                {...register("message")}
                                className={`${inputClasses} resize-none`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Consent */}
                      <div>
                        <label className="flex cursor-pointer items-start gap-3">
                          <input
                            type="checkbox"
                            {...register("agree", {
                              required: "You must agree to the privacy policy.",
                            })}
                            className="peer sr-only"
                          />
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-stroke bg-white/60 text-transparent transition-all duration-300 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-primaryho dark:border-strokedark dark:bg-white/5 dark:peer-checked:border-primaryho dark:peer-checked:bg-primaryho">
                            <FaCheck aria-hidden className="h-2.5 w-2.5" />
                          </span>
                          <span className="text-sectiontitle text-waterloo dark:text-manatee">
                            I agree to the{" "}
                            <Link
                              href="/privacy-policy"
                              className="font-medium text-primary underline underline-offset-4 transition-colors duration-300 hover:text-primaryho dark:text-primaryLight"
                            >
                              Privacy Policy
                            </Link>{" "}
                            and consent to being contacted. *
                          </span>
                        </label>
                        {errors.agree && (
                          <p className={errorClasses}>
                            {String(errors.agree.message)}
                          </p>
                        )}
                      </div>

                      {/* Submit */}
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full sm:w-auto"
                        iconPosition="right"
                        icon={
                          isLoading ? (
                            <span className="animate-spin">
                              <ArrowIcon className="fill-white" />
                            </span>
                          ) : (
                            <ArrowIcon className="fill-white" />
                          )
                        }
                      >
                        {isLoading ? "Please wait..." : "Send Message"}
                      </Button>
                    </fieldset>
                  </form>
                </motion.div>

                {/* Mobile: centred vertical hairline between zones */}
                <div aria-hidden className="flex justify-center py-4 lg:hidden">
                  <span className="h-16 w-px bg-gradient-to-b from-transparent via-waterloo/40 to-transparent dark:via-white/20" />
                </div>

                {/* ---- Info zone ---- */}
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.45, delay: 0.2, ease: EASE }}
                  className="p-6 md:p-8 lg:col-span-2"
                >
                  <div className="flex items-start gap-3.5">
                    <span className="dark:bg-primaryho/15 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primaryho/10 text-regular text-primaryho dark:text-primaryLight">
                      <FaGem aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-itemtitle font-bold text-black dark:text-white">
                        Why Sell to Us
                      </h3>
                      <p className="mt-1.5 text-sectiontitle text-waterloo dark:text-manatee">
                        A buy-back partner that treats your surplus like an
                        asset, not a liability.
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 divide-y divide-stroke dark:divide-white/10">
                    {whyUs.map((item, i) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: 0.25 + i * 0.08,
                          ease: EASE,
                        }}
                        className="flex items-start gap-3 py-4 first:pt-0 last:pb-0"
                      >
                        <span className="dark:bg-primaryho/15 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primaryho/10 text-sectiontitle text-primaryho dark:text-primaryLight">
                          {item.icon}
                        </span>
                        <div className="min-w-0">
                          <p className="text-regular font-semibold text-black dark:text-white">
                            {item.title}
                          </p>
                          <p className="mt-1 text-sectiontitle text-waterloo dark:text-manatee">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-7 border-t border-stroke pt-5 dark:border-strokedark">
                    <Button
                      href="/brands"
                      variant="outline"
                      size="md"
                      className="w-full"
                    >
                      Browse Our Brands
                    </Button>
                    <p className="mt-4 text-center text-sectiontitle text-waterloo dark:text-manatee">
                      Questions first?{" "}
                      <Link
                        href="/contact"
                        className="font-medium text-primary underline underline-offset-4 transition-colors duration-300 hover:text-primaryho dark:text-primaryLight"
                      >
                        Contact the team
                      </Link>
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== Form widget End ===== */}
    </>
  );
};

export default BuyBackContact;
