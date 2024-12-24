import React from "react";
import Contact from "@/components/Contact";
import { Metadata } from "next";
import Image from "next/image";


export const metadata: Metadata = {
  title: "Contact Us - Heliacenergii",
  description: "This is the Contact page for Heliacenergii",
  // other metadata
};

const SupportPage = () => {


  return (
    <main className="flex w-full flex-col pt-[90px] md:pt-[102px] mx-auto max-w-c-1390">
      <section className="w-full">
        <div className="relative h-[360px] w-full md:h-[720px]">
          <Image
            src="/images/contact/contact.jpg"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1600px) 75vw,33vw"
            alt="Picture of the About page banner"
            priority={true}
          />
          <div
            style={{
              clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 25% 100%)",
            }}
            className="absolute inset-0 bg-transparent bg-gradient-to-b from-primary/100 to-primary/80"
          ></div>
          <div className="absolute bottom-0 flex h-2/4 w-full flex-col justify-center align-middle">
            <h1 className="relative pr-[20%] text-end text-3xl font-extrabold text-white before:-z-1 before:bg-black dark:before:bg-titlebgdark sm:text-5xl md:pr-[30%]">
              Contact Us
            </h1>
          </div>
        </div>
      </section>
      <Contact />
    </main>
  );
};

export default SupportPage;
