import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Brand } from "@/types/brand";
import { motion } from "framer-motion";

const SingleBrand = ({
  brand,
  selected,
  setSelected,
}: {
  brand: {
    name: string;
    index: number;
  };
  selected: number;
  setSelected: (any) => void;
}) => {
  const { name, index } = brand;

  return (
    <div
      onClick={() => {
        setSelected(index);
      }}
      className={`${
        selected === index ? "bg-primary" : null
      } mx-w-full group relative mx-6 block h-20 w-full rounded rounded-b-none opacity-100 backdrop-blur-lg transition-all duration-300 hover:bg-primary hover:opacity-80`}
    >
      <h3 className={`${
        selected === index ? "text-white opacity-100" : "text-gray-900 opacity-50"
      } my-8 px-8 text-center text-2xl font-bold leading-none tracking-tight text-gray-900 opacity-50 transition-all duration-300 group-hover:text-white group-hover:opacity-100 dark:hidden md:text-2xl lg:text-3xl`}>
        {name}
      </h3>
    </div>
  );
};

export default SingleBrand;
