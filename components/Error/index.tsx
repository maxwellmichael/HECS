"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/Common/Button";
import ArrowIcon from "@/components/Common/ArrowIcon";

const ErrorSection = () => {
  return (
    <section className="relative overflow-hidden pb-25 pt-45 lg:pb-32.5 lg:pt-50 xl:pb-37.5 xl:pt-55">
      <div className="absolute left-0 top-0 -z-1 h-64 w-64 opacity-60 dark:opacity-20">
        <Image
          src="/images/shape/shape-dotted-light.svg"
          alt="decorative shape"
          className="h-full w-full dark:hidden"
          width={256}
          height={256}
        />
        <Image
          src="/images/shape/shape-dotted-dark.svg"
          alt="decorative shape"
          className="hidden h-full w-full dark:block"
          width={256}
          height={256}
        />
      </div>

      <div className="absolute bottom-0 right-0 -z-1 h-64 w-64 opacity-60 dark:opacity-20">
        <Image
          src="/images/shape/shape-dotted-light.svg"
          alt="decorative shape"
          className="h-full w-full rotate-180 dark:hidden"
          width={256}
          height={256}
        />
        <Image
          src="/images/shape/shape-dotted-dark.svg"
          alt="decorative shape"
          className="hidden h-full w-full rotate-180 dark:block"
          width={256}
          height={256}
        />
      </div>

      <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <div className="mx-auto max-w-[700px] text-center">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, delay: 0.1 }}
            className="animate_top"
          >
            <h1 className="mb-6 text-[120px] font-extrabold leading-none text-primary dark:text-primaryho sm:text-[160px] md:text-[200px]">
              404
            </h1>

            <h2 className="mb-5 text-3xl font-bold text-black dark:text-white md:text-4xl">
              Page Not Found
            </h2>

            <p className="mx-auto mb-10 max-w-[500px] text-regular text-waterloo dark:text-manatee">
              The page you were looking for appears to have been moved, deleted,
              or does not exist. Let&apos;s get you back on track.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                href="/"
                variant="primary"
                size="lg"
                icon={<ArrowIcon />}
                iconPosition="left"
              >
                Return to Home
              </Button>
              <Button
                href="/contact"
                variant="ghost"
                size="lg"
                icon={<ArrowIcon />}
                iconPosition="right"
              >
                Contact Support
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ErrorSection;
