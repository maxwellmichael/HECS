import { Metadata } from "next";
import Contact from "@/components/Contact";
import ContactHero from "@/components/Contact/ContactHero";

export const metadata: Metadata = {
  title: "Contact Us | Heliac Energii Controls Solutions",
  description:
    "Get in touch with Heliac Energii Controls Solutions for industrial spares, repairs and buy-back enquiries. We respond within 24 hours.",
};

const ContactPage = () => {
  return (
    <>
      <ContactHero />
      <Contact />
    </>
  );
};

export default ContactPage;
