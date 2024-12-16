import { Metadata } from "next";
import Hero from "@/components/Hero";
import Feature from "@/components/Features";
import FunFact from "@/components/FunFact";
import Contact from "@/components/Contact";
import Caurosel1 from "@/components/Caurosel1";
import ServicesSection from "@/components/ServicesSection";
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
