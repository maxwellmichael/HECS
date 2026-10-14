import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/Products/ProductDetail";
import {
  catalogProducts,
  getProductBySlug,
} from "@/components/Products/productsData";

interface PageProps {
  params: { slug: string };
}

export const generateStaticParams = () =>
  catalogProducts.map((product) => ({ slug: product.id }));

export const generateMetadata = ({ params }: PageProps): Metadata => {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return { title: "Product Not Found | Heliac Energii Controls Solutions" };
  }
  return {
    title: `${product.name} | Heliac Energii Controls Solutions`,
    description: product.summary,
  };
};

const ProductDetailPage = ({ params }: PageProps) => {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <section className="py-20 lg:py-25 xl:py-30">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <ProductDetail product={product} />
      </div>
    </section>
  );
};

export default ProductDetailPage;
