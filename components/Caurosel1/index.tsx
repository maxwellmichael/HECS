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
        description:'Heliac Energii excels in troubleshooting, servicing, and supplying spares for hydraulic and pneumatic systems across industries like Marine, Oil & Gas, Construction, and Power Plants. We offer end-to-end solutions to ensure optimal performance and reduced downtime for your machinery.',
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
        description:'Maximize asset value and secure the highest return on investments with our buy-back solutions.',
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
    <section className="pb-8 md:pb-20 pt-[86px] md:pt-[82px]">
      <div className="h-[368px] md:h-[700px] ">
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
