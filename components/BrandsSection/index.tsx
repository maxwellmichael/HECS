import React from "react";
import SectionHeader from "../Common/SectionHeader";
import BrandSlider from "../BrandSlider";

export default function BrandsSection() {
  return (
    <section id="features" className="py-20 lg:py-25 xl:py-30">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <SectionHeader
          headerInfo={{
            title: "Brand Products",
            subtitle: "Brands We Serve",
            description: `We proudly collaborate with leading brands in the industrial automation, control, and instrumentation sectors.`,
          }}
        />
        <div className="mt-12">
          <BrandSlider />
        </div>
      </div>
    </section>
  );
}
