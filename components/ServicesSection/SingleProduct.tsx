import React from "react";
import { Service } from "@/types/feature";
import Image from "next/image";
import { motion } from "framer-motion";

const SingleFeature = ({ feature }: { feature: Service }) => {
  const { image, title, description } = feature;

  return (
    <>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: -10,
          },

          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="animate_top z-40 rounded-2xl border border-white bg-white shadow-solid-3  dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark relative cursor-pointer sm:overflow-hidden md:overflow-visible"
      >
        <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm transition-all duration-300 hover:shadow-solid-4 md:hover:scale-110 sm:hover:scale-0">
        <img src={image} alt="University of Southern California" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 filter grayscale opacity-90 transition-all duration-300 hover:opacity-20 hover:filter-none"></div>
        {/* <div className="relative flex h-16 w-16 items-center justify-center rounded-[4px] bg-primary">
          <Image src={icon} width={36} height={36} alt="title" />
        </div> */}
        <h3 className="mb-5 mt-7.5 text-xl font-semibold text-white dark:text-white xl:text-itemtitle z-10 relative">
          {title}
        </h3>
        <p className="z-10 relative text-zumthor">{description}</p>
        </article>
      </motion.div>
    </>
  );
};

export default SingleFeature;
