import BuyBackContact from "@/components/BuyBackContact";
import React from "react";
import Image from "next/image";

export default function BuyBack() {
  return (
    <main className="flex w-full flex-col">
    <section className="w-full">
      <div className="relative h-[360px] w-full md:h-[720px]">
        <Image
          src="/images/buyback/buyback.jpg"
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
            Buy Back
          </h1>
        </div>
      </div>
    </section>
    <BuyBackContact />
  </main>
   
  );
}
