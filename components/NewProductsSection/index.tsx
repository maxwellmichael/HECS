"use client";
import React from "react";
import productsData from "./productsData";
import SingleProduct from "./SingleProduct";
import SectionHeader from "../Common/SectionHeader";

const NewProductsSection = () => {
  return (
    <>
      {/* <!-- ===== Features Start ===== --> */}
      <section id="features" className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          {/* <!-- Section Title Start --> */}
          <SectionHeader
            headerInfo={{
              title: "NEW PRODUCTS",
              subtitle: "Leading-Edge Technology for Industrial Advancement",
              description: `HECS proudly presents a comprehensive range of new products tailored to the demands of modern industry.`,
            }}
          />
          {/* <!-- Section Title End --> */}

          <div className="mt-6.5 flex flex-nowrap w-full lg:mt-8 xl:mt-10">
            {/* <!-- Features item Start --> */}

            {productsData.map((feature, key) => (
              <SingleProduct feature={feature} key={key} />
            ))}
            {/* <!-- Features item End --> */}
          </div>
        </div>
      </section>

      {/* <!-- ===== Features End ===== --> */}
    </>
  );
};

export default NewProductsSection;
