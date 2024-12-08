"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";

type TSlideImage = {
  title: string;
  description: string;
  imagePath: string;
  linkPath?: string;
};

export default function SliderImage({
  title,
  description,
  imagePath,
  linkPath,
}: TSlideImage) {
  return (
    <section className="relative h-full w-full">
      <div className="absolute inset-0 z-20 bg-transparent bg-gradient-to-r from-white/60 to-white/30 md:from-white/90 md:to-white/20"></div>
      <Image
        src={imagePath}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1920px) 75vw,33vw"
        alt="Picture of the About page banner"
        priority={true}
        className="absolute z-10"
      />
      <div className="relative mx-auto max-w-screen-xl px-4 py-6 sm:px-6 md:py-12 lg:flex lg:h-full lg:items-center lg:px-8">
        <div className="absolute z-30 w-3/4 text-left md:max-w-xl">
          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                x: -80,
              },

              visible: {
                opacity: 1,
                x: 0,
              },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_left md:w-[70%] lg:w-full"
          >
            <h1 className="mb-2 text-itemtitle2 font-bold text-black dark:text-white md:mb-3 md:text-hero">
              <strong className="block font-extrabold text-primary">
                {title}
              </strong>
            </h1>
            <p className="regular text-black md:text-para2">{description}</p>
          </motion.div>

          {/* <div className="mt-8 flex flex-wrap gap-4 text-center">
            <button
              type="button"
              className="inline-flex items-center rounded-lg border-2 border-white bg-primary text-white px-5 py-2.5 text-center text-sm font-medium hover:bg-white hover:text-primary  hover:border-primary focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Learn More
              <svg
                className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
}
