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
              description: `At Heliac Energii Control Solutions, we specialize in procuring premium hydraulics, instrumentation, automation, electrical, and mechanical spares. Our portfolio includes products from industry-leading brands such as Allen Bradley, Siemens, Mitsubishi, ABB, Schneider, Eaton, Parker, Weidmüller, Beckhoff, and many more. We are committed to delivering innovative solutions, high-quality products, and exceptional expertise to meet your requirements.`,
            }}
          />

          <div className="mt-12.5 lg:mt-15 xl:mt-20 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-12.5">

            {featuresData.map((feature, key) => (
              <SingleFeature feature={feature} key={key} />
            ))}
          </div>
        </div>
      </section>

    </>
  );
};

export default Feature;
