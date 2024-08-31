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
              description: `Heliac Energii Controls Solutions  proudly presents a comprehensive range of new products tailored to the demands of modern industry.`,
            }}
          />
          {/* <!-- Section Title End --> */}

          {/* <div className="relative mt-8">
            <div className="relative -mb-6 w-full pb-6">
              <ul
                role="list"
                className="mx-4 flex flex-wrap space-x-8 sm:mx-6 lg:mx-0"
              >
                {productsData.map((feature, key) => (
                  <li className="w-64 flex-col text-center lg:w-auto">
                    <div className="group relative">
                      <SingleProduct feature={feature} key={key} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div> */}

          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {productsData.map((product) => (
              <a
                key={product.id}
                href="#"
                className="relative rounded-lg bg-stroke"
              >
                <span className="absolute left-0 top-0 m-2 rounded-full bg-primary px-2 text-center text-sm font-medium text-white">
                  {product.category}
                </span>
                <div className="aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 group h-[180px] overflow-hidden bg-titlebg2Light md:h-[180px] xl:h-[320px]">
                  <img
                    alt={product.image}
                    src={product.image}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="relative flex w-full flex-col items-start justify-between px-3 py-2">
                  <h3 className="mt-1 line-clamp-1 text-metatitle text-gray-700 sm:line-clamp-1 md:line-clamp-3">
                    {product.title}
                  </h3>

                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* <div className="mt-6.5 flex w-full flex-nowrap lg:mt-8 xl:mt-10">
            {productsData.map((feature, key) => (
              <SingleProduct feature={feature} key={key} />
            ))}
          </div> */}
        </div>
      </section>

      {/* <!-- ===== Features End ===== --> */}
    </>
  );
};

export default NewProductsSection;
