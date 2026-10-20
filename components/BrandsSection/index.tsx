import SectionHeader from "../Common/SectionHeader";
import BrandSlider from "../BrandSlider";
import BrandsHero from "./BrandsHero";

const BrandsSection = () => {
  return (
    <>
      {/* ===== Brands hero (glass frame + stat bar) ===== */}
      {/* <BrandsHero /> */}

      {/* <!-- ===== Brands Start ===== */}
      <section id="brands" className="py-12 lg:py-16 xl:py-20">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <SectionHeader
            headerInfo={{
              title: "Brands We Serve",
              subtitle: "Browse by Brand",
              description:
                "Explore our comprehensive catalog of industrial automation components from world-leading manufacturers.",
            }}
          />

          <div id="brand-selector" className="mt-12.5 scroll-mt-28">
            <BrandSlider />
          </div>

          <p className="mx-auto mt-10 max-w-3xl text-center text-sectiontitle text-waterloo dark:text-manatee">
            We are not authorized distributors or representatives of any
            specific brands mentioned. All trademarks and brand names are the
            property of their respective owners.
          </p>
        </div>
      </section>
      {/* <!-- ===== Brands End ===== */}
    </>
  );
};

export default BrandsSection;
