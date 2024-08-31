"use client";
import React from "react";
import featuresData from "./featuresData";
import SingleFeature from "./SingleFeature";
import SectionHeader from "../Common/SectionHeader";

const Feature = () => {
  return (
    <>
      {/* <!-- ===== Features Start ===== --> */}
      <section id="features" className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          {/* <!-- Section Title Start --> */}
          <SectionHeader
            headerInfo={{
              title: "OUR FEATURES",
              subtitle: "Why Choose Us",
              description: `At Heliac Energii Controls Solutions, we possess the knowledge and proven expertise to support the Automation , Electrical and Mechanical Spares  from  every stage  to after-sales support. 
We supply a wide range of well-known manufacturers such as:  Allen Bradley, Omron, Siemens, Mitsubishi, ABB, GE Speedtronics ,Ge Excitations , G FANUC, Schneider , Bently Nevada , Woodwards, Emerson  and  more  brands to provide you with cutting-edge technology, high-quality products, and expert services.
`,
            }}
          />
          {/* <!-- Section Title End --> */}

          <div className="mt-12.5 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:mt-15 lg:grid-cols-3 xl:mt-20 xl:gap-12.5">
            {/* <!-- Features item Start --> */}

            {featuresData.map((feature, key) => (
              <SingleFeature feature={feature} key={key} />
            ))}
            {/* <!-- Features item End --> */}
          </div>
        </div>
      </section>

      {/* <!-- ===== Features End ===== --> */}
    </>
  );
};

export default Feature;
