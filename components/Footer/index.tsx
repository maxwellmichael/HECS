"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  FaArrowRight,
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import Button from "@/components/Common/Button";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

/* Social/contact tiles — top row */
const tiles = [
  { label: "LinkedIn", href: "#", aria: "Heliac Energii on LinkedIn", icon: <FaLinkedinIn aria-hidden /> },
  { label: "Facebook", href: "#", aria: "Heliac Energii on Facebook", icon: <FaFacebookF aria-hidden /> },
  { label: "Twitter", href: "#", aria: "Heliac Energii on Twitter", icon: <FaTwitter aria-hidden /> },
  { label: "Email Us", href: "mailto:inquiry@heliacenergii.com", aria: "Email Heliac Energii", icon: <FaEnvelope aria-hidden /> },
];

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Brands", href: "/brands" },
  { label: "Products", href: "/products" },
  { label: "Buy Back", href: "/buy-back" },
  { label: "About", href: "/about" },
];

const supportLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const contactLinks = [
  { label: "inquiry@heliacenergii.com", href: "mailto:inquiry@heliacenergii.com" },
  { label: "0091 - 8411981840", href: "tel://+00918411981840" },
  { label: "0091 - 8793823181", href: "tel://+00918793823181" },
];

const offices = [
  { city: "Goa, India", address: "Sanguem, Goa 403704, India" },
  { city: "Kalispell, USA", address: "Kalispell, MT, United States" },
];

const columnLinkClasses =
  "inline break-words text-regular text-blackho transition-colors duration-300 hover:text-primaryho underline decoration-transparent underline-offset-4 hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho dark:text-manatee dark:hover:text-primaryLight";

const columnHeadingClasses =
  "text-sectiontitle font-semibold uppercase tracking-widest text-waterloo dark:text-manatee";

const Footer = () => {
  const [spotActive, setSpotActive] = useState(false);
  const reduce = useReducedMotion() === true;

  /* Cursor spotlight behind the glass */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spotX = useSpring(mx, { stiffness: 60, damping: 20 });
  const spotY = useSpring(my, { stiffness: 60, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
    if (!spotActive) setSpotActive(true);
  };

  return (
    <footer
      onMouseMove={handleMove}
      onMouseLeave={() => setSpotActive(false)}
      className="relative isolate overflow-hidden"
    >
      {/* ==== Animated decor layer — what the glass frosts ==== */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primaryho/20 blur-3xl dark:bg-primaryho/25"
        animate={reduce ? undefined : { x: [0, 80, 0], y: [0, 50, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-primary/15 blur-3xl dark:bg-primaryho/20"
        animate={reduce ? undefined : { x: [0, -90, 0], y: [0, -40, 0], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-56 w-56 rounded-full bg-meta/10 blur-3xl"
        animate={reduce ? undefined : { x: [0, 60, -40, 0], y: [0, -30, 40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-white/5"
        initial={{ x: "-60%" }}
        animate={reduce ? { x: "-60%" } : { x: ["-60%", "360%"] }}
        transition={{ duration: 6, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        style={{ x: spotX, y: spotY }}
        className={`pointer-events-none absolute -ml-40 -mt-40 h-80 w-80 rounded-full bg-white/10 blur-3xl transition-opacity duration-500 dark:bg-primaryho/10 ${
          spotActive && !reduce ? "opacity-100" : "opacity-0"
        }`}
      />
      <Image
        fill
        sizes="100vw"
        src="/images/shape/shape-dotted-light.svg"
        alt=""
        aria-hidden
        className="absolute inset-0 opacity-40 dark:hidden"
      />
      <Image
        fill
        sizes="100vw"
        src="/images/shape/shape-dotted-dark.svg"
        alt=""
        aria-hidden
        className="absolute inset-0 hidden opacity-20 dark:block"
      />

      {/* ==== Glass surface ==== */}
      <div
        aria-hidden
        className="absolute inset-0 border-t border-stroke bg-white/40 backdrop-blur-2xl backdrop-saturate-150 dark:border-white/10 dark:bg-blacksection/50"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent dark:from-white/5" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/25" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/20 dark:ring-white/5" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/5 to-transparent dark:from-black/30" />
      </div>

      {/* ==== Content ==== */}
      <div className="relative mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        {/* ---- Brand strip ---- */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between lg:py-12"
        >
          <div className="flex items-center gap-4">
            <Link
              href="/"
              aria-label="Heliac Energii Controls Solutions — home"
              className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho"
            >
              <Image
                width={80}
                height={58}
                src="/images/logo/logo.svg"
                alt="Heliac Energii Controls Solutions"
                className="dark:hidden"
              />
              <Image
                width={80}
                height={58}
                src="/images/logo/logo-dark.svg"
                alt="Heliac Energii Controls Solutions"
                className="hidden dark:block"
              />
            </Link>
            <div>
              <p className="text-itemtitle2 font-bold text-black dark:text-white">
                Heliac Energii Controls Solutions
              </p>
              <p className="mt-1 text-sectiontitle text-waterloo dark:text-manatee">
                Powering the Future of Industrial Innovation.
              </p>
            </div>
          </div>

          <Button
            href="/contact"
            variant="primary"
            size="md"
            icon={<FaArrowRight aria-hidden className="h-3 w-3" />}
            iconPosition="right"
          >
            Get a Quote
          </Button>
        </motion.div>

        {/* ---- Social / contact tiles — 2×2 from 320px, 4-across at lg ---- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-stroke dark:lg:divide-white/10">
          {tiles.map((tile, i) => (
            <motion.a
              key={tile.label}
              href={tile.href}
              aria-label={tile.aria}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.3, delay: 0.05 + i * 0.05, ease: EASE }}
              className="group flex items-center justify-between gap-2.5 border-t border-stroke px-3 py-4 transition-colors duration-300 hover:bg-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primaryho odd:border-r odd:border-stroke dark:border-white/10 dark:hover:bg-white/5 dark:odd:border-white/10 sm:gap-3 sm:px-4 sm:py-5 lg:odd:border-r-0 lg:px-8"
            >
              <span className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stroke bg-white/60 text-sectiontitle text-blackho transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:group-hover:border-primaryho dark:group-hover:bg-primaryho sm:h-10 sm:w-10 sm:text-regular">
                  {tile.icon}
                </span>
                <span className="truncate text-sectiontitle font-medium text-black dark:text-white sm:text-regular">
                  {tile.label}
                </span>
              </span>
              <FaArrowRight
                aria-hidden
                className="hidden h-3.5 w-3.5 shrink-0 text-waterloo transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primaryho dark:text-manatee dark:group-hover:text-primaryLight sm:block"
              />
            </motion.a>
          ))}
        </div>

        {/* ---- Link columns — 2×2 from 320px, 4-across with hairlines at lg ---- */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-stroke py-12 dark:border-white/10 sm:gap-x-10 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-stroke lg:py-14 dark:lg:divide-white/10">
          <motion.nav
            aria-label="Footer — explore"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.3, delay: 0.1, ease: EASE }}
            className="lg:px-8 lg:first:pl-0 lg:last:pr-0"
          >
            <h3 className={columnHeadingClasses}>Explore</h3>
            <ul className="mt-5 space-y-3.5">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={columnLinkClasses}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.nav
            aria-label="Footer — support"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.3, delay: 0.15, ease: EASE }}
            className="lg:px-8 lg:first:pl-0 lg:last:pr-0"
          >
            <h3 className={columnHeadingClasses}>Support</h3>
            <ul className="mt-5 space-y-3.5">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={columnLinkClasses}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.nav
            aria-label="Footer — contact"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.3, delay: 0.2, ease: EASE }}
            className="lg:px-8 lg:first:pl-0 lg:last:pr-0"
          >
            <h3 className={columnHeadingClasses}>Contact</h3>
            <ul className="mt-5 space-y-3.5">
              {contactLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={columnLinkClasses}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.3, delay: 0.25, ease: EASE }}
            className="lg:px-8 lg:first:pl-0 lg:last:pr-0"
          >
            <h3 className={columnHeadingClasses}>Offices</h3>
            <div className="mt-5 space-y-4">
              {offices.map((office) => (
                <p
                  key={office.city}
                  className="text-regular leading-relaxed text-blackho dark:text-manatee"
                >
                  {office.city}
                  <span className="mt-0.5 block text-sectiontitle text-waterloo dark:text-manatee">
                    {office.address}
                  </span>
                </p>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ---- Centered copyright bar ---- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.3, delay: 0.3, ease: EASE }}
          className="border-t border-stroke py-7 pb-24 dark:border-white/10 md:pb-7"
        >
          <p className="text-center text-sectiontitle text-waterloo dark:text-manatee">
            © {new Date().getFullYear()} Heliac Energii Controls Solutions. All
            rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;