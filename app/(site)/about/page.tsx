import { Metadata } from "next";
import About from "@/components/About";
import AboutHero from "@/components/About/AboutHero";

export const metadata: Metadata = {
  title: "About Us | Heliac Energii Controls Solutions",
  description:
    "Heliac Energii Controls Solutions is an established supplier of automation, instrumentation, electrical and mechanical components — trusted by partners across the industrial sector for quality, reliability and expertise.",
};

const AboutPage = () => {
  return (
    <>
      <AboutHero />
      <About />
      {/* <Feature /> */}
    </>
  );
};

export default AboutPage;
