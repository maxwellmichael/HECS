import { Metadata } from "next";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Feature from "@/components/Features";
import About from "@/components/About";
import FeaturesTab from "@/components/FeaturesTab";
import FunFact from "@/components/FunFact";
import Integration from "@/components/Integration";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Blog from "@/components/Blog";
import Testimonial from "@/components/Testimonial";
import Caurosel1 from "@/components/Caurosel1";
import ServicesSection from "@/components/ServicesSection";
import NewProductsSection from "@/components/NewProductsSection";
import BrandSlider from "@/components/BrandSlider";
import BrandsSection from "@/components/BrandsSection";

export const metadata: Metadata = {
  title: "Heliac Energii | Controls Solutions",
  description: "Powering the Future of Electric Innovation",
};

export default function Home() {
  return (
    <main>
      <Caurosel1 />
      <Hero />
      {/* <Brands /> */}
      <BrandsSection/>
      {/* <NewProductsSection /> */}
      <Feature />
      <ServicesSection />
      {/* <About /> */}
      {/* <FeaturesTab /> */}
      <FunFact />
      {/* <Integration /> */}
      {/* <CTA /> */}
      {/* <FAQ /> */}
      {/* <Testimonial /> */}
      {/* <Pricing /> */}
      <Contact />
      {/* <Blog /> */}
    </main>
  );
}
