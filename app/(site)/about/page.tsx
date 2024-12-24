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
      <main className="flex w-full flex-col pt-[90px] md:pt-[102px] mx-auto max-w-c-1390">
        <section className="w-full">
          <div className="relative h-[360px] w-full md:h-[720px]">
            <Image
              src="/images/about/banner_1.jpg"
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
              <h1 className="relative text-end pr-[20%] md:pr-[30%] text-3xl font-extrabold text-white before:-z-1 before:bg-black dark:before:bg-titlebgdark sm:text-5xl">
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
