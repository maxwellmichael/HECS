import Feature from "@/components/Features";
import Image from "next/image";

export const metadata = {
  title: "About Us - Heliacenergii",
  description:
    "ABOUT Heliacenergii,  Heliacenergii is an established distributor and seller of automation components. We have been serving Georgia OEMs, machine users, and resellers for nearly four decades. Our work helps companies of all sizes—from growing manufacturers to Fortune 500 businesses—create products and generate billions of dollars in revenue each year",
};

export default function About() {
  return (
    <>
      <main className="flex w-full flex-col">
        <section className="w-full">
          <div className="relative h-[360px] w-full md:h-[720px]">
            <Image
              src="/images/about/banner_1.jpg"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1600px) 75vw,33vw"
              alt="Picture of the About page banner"
              priority={true}
            />
            <div className="absolute inset-0 bg-white/100 sm:bg-transparent sm:bg-gradient-to-b sm:from-white/100 sm:to-white/0"></div>
            <div className="h-full w-full flex flex-col align-middle justify-center relative">
              <h1 className="text-3xl relative text-center before:-z-1 font-extrabold text-black before:bg-black dark:before:bg-titlebgdark sm:text-5xl">
                About Us
              </h1>
            </div>
          </div>
        </section>
        <Feature />
      </main>
    </>
  );
}
