"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import toast from "react-hot-toast";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaAddressBook,
  FaBuilding,
  FaCheck,
  FaChevronRight,
  FaComment,
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaMobileAlt,
  FaPaperPlane,
  FaSpinner,
  FaTag,
  FaTwitter,
  FaUser,
} from "react-icons/fa";
import Button from "@/components/Common/Button";
import SectionHeader from "@/components/Common/SectionHeader";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const inputClasses =
  "w-full rounded-xl border border-stroke bg-white/60 py-3.5 pl-11 pr-4 text-regular text-black placeholder:text-waterloo transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-strokedark dark:bg-white/5 dark:text-white dark:placeholder:text-manatee dark:focus:border-primaryho dark:focus:ring-primaryho/20";

const fieldIconClasses =
  "pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-waterloo dark:text-manatee";

const labelClasses =
  "mb-2 block text-metatitle font-semibold uppercase tracking-widest text-waterloo dark:text-manatee";

const errorClasses = "mt-1.5 text-metatitle text-red-600 dark:text-red-500";

const locations = [
  {
    city: "Goa, India",
    address:
      "184, Opposite Miracles School, Pangulna, Sanguem, Goa 403704, India",
    map: "https://www.google.com/maps/search/?api=1&query=Pangulna+Sanguem+Goa+India",
  },
  {
    city: "Kalispell, MT, USA",
    address: "Kalispell, Montana, United States",
    map: "https://www.google.com/maps/search/?api=1&query=Kalispell+MT+USA",
  },
];

const channels = [
  {
    icon: <FaEnvelope aria-hidden />,
    label: "Email",
    value: "inquiry@heliacenergii.com",
    href: "mailto:inquiry@heliacenergii.com",
  },
  {
    icon: <FaMobileAlt aria-hidden />,
    label: "Phone",
    value: "0091-8411981840",
    href: "tel:+918411981840",
  },
  {
    icon: <FaMobileAlt aria-hidden />,
    label: "Alternate Phone",
    value: "0091-8793823181",
    href: "tel:+918793823181",
  },
];

const socials = [
  { icon: <FaLinkedinIn aria-hidden />, label: "LinkedIn", href: "#" },
  { icon: <FaFacebookF aria-hidden />, label: "Facebook", href: "#" },
  { icon: <FaTwitter aria-hidden />, label: "Twitter", href: "#" },
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

const Contact = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [isLoading, setLoading] = useState(false);
  const reduce = useReducedMotion() === true;

  /* ---- FORM LOGIC — UNCHANGED ---- */
  const handleFormSubmit = (formData: any) => {
    setLoading(true);
    const newData = { ...formData, current_year: new Date().getFullYear() };
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID,
        newData,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY },
      )
      .then(
        () => {
          router.push("/");
          toast.success(
            "Thank you! Your message has been sent successfully. We'll get back to you shortly.",
          );
        },
        () => {
          toast.error("Oops! Something went wrong. Please try again later.");
        },
      )
      .finally(() => setLoading(false));
  };

  return (
    <section id="message-form" className="scroll-mt-28 py-12 lg:py-16 xl:py-20">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <SectionHeader
          headerInfo={{
            title: "Send a Message",
            subtitle: "We Reply Within 24 Hours",
            description:
              "Tell us what you need — spares, repairs or buy-backs — and our team will get back to you within one business day.",
          }}
        />

        {/* ==== Single glass widget ==== */}
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
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-primary/15 blur-3xl dark:bg-primaryho/20"
              animate={
                reduce
                  ? undefined
                  : { x: [0, -70, 0], y: [0, -40, 0], scale: [1.1, 1, 1.1] }
              }
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute left-1/3 top-1/3 h-56 w-56 rounded-full bg-meta/10 blur-3xl"
              animate={
                reduce ? undefined : { x: [0, 50, -30, 0], y: [0, -30, 40, 0] }
              }
              transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
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
            className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/40 shadow-solid-l backdrop-blur-2xl backdrop-saturate-150 dark:border-white/10 dark:bg-blacksection/50"
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
              {/* Desktop: subtle vertical gradient hairline at the 3/5 seam */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-10 left-[60%] hidden w-px bg-gradient-to-b from-transparent via-waterloo/30 to-transparent dark:via-white/15 lg:block"
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
                    {/* Group 1 — Your Information */}
                    <div>
                      <GroupLabel>Your Information</GroupLabel>
                      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="fullName" className={labelClasses}>
                            Full Name *
                          </label>
                          <div className="relative">
                            <FaUser aria-hidden className={fieldIconClasses} />
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
                                  message: "Please enter a valid email address.",
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
                          <label htmlFor="companyName" className={labelClasses}>
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
                          <label htmlFor="phoneNumber" className={labelClasses}>
                            Phone Number *
                          </label>
                          <div className="relative">
                            <FaMobileAlt
                              aria-hidden
                              className={fieldIconClasses}
                            />
                            <PhoneInput
                              international
                              defaultCountry="IN"
                              autoFormat
                              placeholder="Enter phone number"
                              value={watch("phoneNumber") || undefined}
                              onChange={(value) =>
                                setValue("phoneNumber", value || "", {
                                  shouldValidate: true,
                                })
                              }
                              className="w-full rounded-xl border border-stroke bg-white/60 transition-all duration-300 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 dark:border-strokedark dark:bg-white/5 dark:focus-within:border-primaryho dark:focus-within:ring-primaryho/20"
                            />
                            <input
                              type="hidden"
                              {...register("phoneNumber", {
                                required: "Phone number is required.",
                                validate: (value) =>
                                  isValidPhoneNumber(String(value)) ||
                                  "Please enter a valid phone number.",
                              })}
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

                    {/* Group 2 — Your Message */}
                    <div>
                      <GroupLabel>Your Message</GroupLabel>
                      <div className="mt-5 space-y-5">
                        <div>
                          <label htmlFor="subject" className={labelClasses}>
                            Subject
                          </label>
                          <div className="relative">
                            <FaTag aria-hidden className={fieldIconClasses} />
                            <input
                              id="subject"
                              type="text"
                              placeholder="e.g. Gas turbine spares enquiry"
                              {...register("subject")}
                              className={inputClasses}
                            />
                          </div>
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
                              rows={5}
                              placeholder="How can we help?"
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
                          and consent to being contacted about my enquiry. *
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
                      icon={
                        isLoading ? (
                          <FaSpinner aria-hidden className="animate-spin" />
                        ) : (
                          <FaPaperPlane aria-hidden />
                        )
                      }
                    >
                      {isLoading ? "Please wait..." : "Send Message"}
                    </Button>
                  </fieldset>
                </form>
              </motion.div>

              {/* Mobile: centred vertical hairline + breathing room between zones */}
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
                {/* Zone header */}
                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primaryho/10 text-regular text-primaryho dark:bg-primaryho/15 dark:text-primaryLight">
                    <FaAddressBook aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-itemtitle font-bold text-black dark:text-white">
                      Contact Information
                    </h3>
                    <p className="mt-1.5 text-sectiontitle text-waterloo dark:text-manatee">
                      Reach us through any of the channels below — we're happy
                      to help.
                    </p>
                  </div>
                </div>

                {/* Offices */}
                <div className="mt-7">
                  <GroupLabel>Offices</GroupLabel>
                  <div className="mt-4 divide-y divide-stroke dark:divide-white/10">
                    {locations.map((loc, i) => (
                      <motion.div
                        key={loc.city}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: 0.25 + i * 0.08,
                          ease: EASE,
                        }}
                        className="group/loc flex items-start gap-3 py-4 first:pt-0 last:pb-0"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primaryho/10 text-sectiontitle text-primaryho dark:bg-primaryho/15 dark:text-primaryLight">
                          <FaMapMarkerAlt aria-hidden />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-regular font-semibold text-black dark:text-white">
                            {loc.city}
                          </p>
                          <p className="mt-1 text-sectiontitle leading-relaxed text-waterloo dark:text-manatee">
                            {loc.address}
                          </p>
                          <a
                            href={loc.map}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1.5 rounded-full text-metatitle font-semibold uppercase tracking-widest text-primaryho transition-colors duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho dark:text-primaryLight dark:hover:text-primaryho"
                          >
                            Get Directions
                            <FaChevronRight
                              aria-hidden
                              className="h-2 w-2 transition-transform duration-300 group-hover/loc:translate-x-0.5"
                            />
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Direct channels */}
                <div className="mt-7">
                  <GroupLabel>Direct Channels</GroupLabel>
                  <div className="mt-4 space-y-2">
                    {channels.map((channel, i) => (
                      <motion.a
                        key={channel.value}
                        href={channel.href}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: 0.35 + i * 0.08,
                          ease: EASE,
                        }}
                        className="group/ch flex items-center gap-3 rounded-xl px-3 py-3 transition-colors duration-300 hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho dark:hover:bg-white/5"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primaryho/10 text-sectiontitle text-primaryho dark:bg-primaryho/15 dark:text-primaryLight">
                          {channel.icon}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-metatitle font-semibold uppercase tracking-widest text-waterloo dark:text-manatee">
                            {channel.label}
                          </span>
                          <span className="block truncate text-sectiontitle font-semibold text-black transition-colors duration-300 group-hover/ch:text-primaryho dark:text-white dark:group-hover/ch:text-primaryLight">
                            {channel.value}
                          </span>
                        </span>
                        <FaChevronRight
                          aria-hidden
                          className="h-2.5 w-2.5 shrink-0 text-waterloo transition-transform duration-300 group-hover/ch:translate-x-0.5 dark:text-manatee"
                        />
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Social footer */}
                <div className="mt-7 flex items-center justify-between gap-4 border-t border-stroke pt-5 dark:border-strokedark">
                  <span className="text-metatitle font-semibold uppercase tracking-widest text-waterloo dark:text-manatee">
                    Follow Us
                  </span>
                  <div className="flex items-center gap-2.5">
                    {socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-stroke bg-white/60 text-blackho transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho dark:border-strokedark dark:bg-white/5 dark:text-white dark:hover:border-primaryho dark:hover:bg-primaryho"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;