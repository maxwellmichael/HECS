import SectionHeader from "../Common/SectionHeader";
import BrandSlider from "../BrandSlider";

const BrandsSection = () => {
  return (
    <section id="brands" className="relative py-20 lg:py-25 xl:py-30">
      <div className="mx-auto max-w-c-1390 px-4 md:px-8 xl:px-0">
        <SectionHeader
          headerInfo={{
            title: "Brand Products",
            subtitle: "Brands We Serve",
            description:
              "Explore our comprehensive catalog of industrial automation components from world-leading manufacturers.",
          }}
        />

        <div className="mt-12.5">
          <BrandSlider />
        </div>

        {/* Disclaimer */}
        <p className="mx-auto mt-10 max-w-3xl text-center text-sectiontitle text-waterloo dark:text-manatee">
          We are not authorized distributors or representatives of any specific
          brands mentioned. All trademarks and brand names are the property of
          their respective owners.
        </p>
      </div>
    </section>
  );
};

export default BrandsSection;
