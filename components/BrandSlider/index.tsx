"use client";

import React, { useState } from "react";

import Glider from "react-glider";
import "glider-js/glider.min.css";
import { brandData } from "./brandData";
import SingleBrand from "./SingleBrand";

export default function BrandSlider() {
  const [selected, setSelected] = useState<number>(0);

  function handleSelectedClick(s) {
    console.log(s);
    setSelected(s);
  }

  function handleSlideChange(e) {
    console.log(e);
    if (e.detail.value === "prev" && selected > 0) {
      setSelected(selected - 1);
    } else if (e.detail.value === "next" && selected < brandData.length - 1) {
      setSelected(selected + 1);
    }
  }

  return (
    <section className="border border-x-0 border-y-stroke bg-white py-0 dark:border-y-strokedark dark:bg-black">
      <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <Glider
          className="glider-container py-0"
          draggable
          hasArrows
          slidesToShow="auto"
          slidesToScroll={1}
          itemWidth={400}
          resizeLock
          onAnimated={handleSlideChange}
        >
          {brandData.map((b, i) => {
            const brand = { name: b.name, index: i };
            return (
              <SingleBrand
                brand={brand}
                selected={selected}
                setSelected={handleSelectedClick}
              />
            );
          })}
        </Glider>
      </div>
      <div className="grid h-auto w-full grid-cols-2 gap-x-6 gap-y-4 border border-x-0 border-y-stroke bg-alabaster py-8 px-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {brandData[selected].products.map((product, i) => (
          <a
            key={product.name}
            href="#"
            className="relative rounded-lg bg-stroke"
          >
            <div className="relative flex w-full flex-col items-start justify-between px-3 py-4">
              <h3 className="line-clamp-3 text-metatitle text-gray-700 sm:line-clamp-3 md:line-clamp-3">
                {product.name}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
