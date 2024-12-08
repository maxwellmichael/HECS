"use client";

import { Carousel } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import SliderImage from "./components/SliderImage";

const customTheme: CustomFlowbiteTheme["carousel"] = {
  root: {
    leftControl: "display-none",
    rightControl: "display-none",
  },
  scrollContainer: {
    base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-none",
    snap: "snap-x",
  },
};

const slides = [
    {
        id:1,
        title:'Trouble Shooting , Servicing  and supply of spares for  Hydraulics & Pneumatics',
        description:'Heliac Energii specializes in comprehensive servicing and maintenance of hydraulic and pneumatic systems. Our expertise spans a variety of industries, including Marine, Oil & Gas, Construction Machinery, Drilling Rigs, Ready-Mix and Concrete Mixers, Industrial Equipment, and Power Plants. We provide end-to-end solutions, from diagnostics and troubleshooting to routine servicing and the supply of high-quality spare parts, ensuring optimal performance and minimal downtime for your critical machinery.',
        imagePath:'/images/caurousel/slide_1.jpg',
    },
    {
        id:2,
        title:'Electrical, Mechanical, Instrumentation & Automation Solutions',
        description:'Your one-stop destination for all Industrial Spares in Electrical, Mechanical, Instrumentation, and Automation. We focus on supporting  operators optimize performance, reduce costs, and avoid unnecessary system upgrades. Trust us to deliver high-quality components and solutions tailored to your operational needs for current and Obselete spares ',
        imagePath:'/images/caurousel/slide_2.jpg',
    },
    {
        id:3,
        title:'Asset Recovery',
        description:'Maximize the value of your obsolete or surplus control system assets with our comprehensive asset recovery services. We specialize in reclaiming, refurbishing, and reselling industrial control system components, helping you reduce waste, recover costs, and ensure the availability of critical spares. Whether upgrading, decommissioning, or optimizing your systems, we provide a seamless solution for managing your valuable assets.',
        imagePath:'/images/caurousel/slide_3.jpg',
    },
    // {
    //     id:4,
    //     title:'Motor Repair',
    //     description:'Empower Your Electrical Systems with ACB Expertise',
    //     imagePath:'/images/caurousel/slide_4.jpg',
    // },
]

export default function Component() {
  return (
    <section className="pb-20 pt-[86px] md:pt-[82px]">
      <div className="h-[288px] md:h-[700px] ">
        <Carousel
          theme={customTheme}
          onSlideChange={(index) => {}}
          leftControl=" "
          rightControl=" "
        >
        {slides.map((slide)=>{

            return (
                <SliderImage key={slide.id} {...slide} />
            )
        })}
        </Carousel>
      </div>
    </section>
  );
}
