import { Metadata } from "next";
import SectionHeader from "@/components/Common/SectionHeader";
import ProductsHero from "@/components/Products/ProductsHero";
import SingleProductCategory from "@/components/Products/SingleProductCategory";
import { catalogProducts } from "@/components/Products/productsData";

export const metadata: Metadata = {
  title: "Products | Heliac Energii Controls Solutions",
  description:
    "Gas turbine, steam turbine, compressor, generator and mud pump spare parts across mechanical, electrical, electronics & control and instrumentation groups.",
};

const ProductsPage = () => {
  return (
    <>
      {/* ===== Products Hero (client component) ===== */}
      <ProductsHero />

      {/* <!-- ===== Product Families Start ===== */}
      <section
        id="categories"
        className="pb-12 pt-14 lg:pb-16 lg:pt-16 xl:pb-20 xl:pt-20"
      >
        {" "}
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <SectionHeader
            headerInfo={{
              title: "Product Families",
              subtitle: "Browse by Category",
              description:
                "Explore our complete range of turbine, compressor, generator and pump components — organised by system group for fast sourcing.",
            }}
          />

          <div className="mt-12.5 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-12.5">
            {catalogProducts.map((product, key) => (
              <SingleProductCategory
                product={product}
                index={key}
                key={product.id}
              />
            ))}
          </div>
        </div>
      </section>
      {/* <!-- ===== Product Families End ===== */}
    </>
  );
};

export default ProductsPage;
