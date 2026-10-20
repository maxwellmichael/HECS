"use client";
import React from "react";
import featuresData from "./featuresData";
import SingleFeature from "./SingleFeature";
import SectionHeader from "../Common/SectionHeader";

const Feature = () => {
  return (
    <>
      <section id="features" className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <SectionHeader
            headerInfo={{
              title: "OUR FEATURES",
              subtitle: "Why Choose Us",
              description: `At Heliac Energii Control Solutions, we specialize in procuring premium hydraulics, instrumentation, automation, electrical, and mechanical spares. Our portfolio includes products from industry-leading brands.`,
            }}
          />

          <div className="mt-12.5 flex flex-wrap justify-center gap-7.5 lg:mt-15 xl:mt-20 xl:gap-12.5">
            {featuresData.map((feature, key) => (
              <div
                key={key}
                className="w-full md:w-[calc(50%-15px)] lg:w-[calc(33.333%-20px)] xl:w-[calc(33.333%-33.333px)]"
              >
                <SingleFeature index={key} feature={feature} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Feature;
