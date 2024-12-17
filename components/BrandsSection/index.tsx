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
            description: ``,
          }}
        />
        <div className="mt-12">
          <BrandSlider />
        </div>
        <p className="mx-auto md:w-4/5 lg:w-3/5 xl:w-[46%] text-center mt-5">We are not authorized distributors or representatives of any specific brands mentioned. All trademarks and brand names are the property of their respective owners.</p>
      </div>
    </section>
  );
}
