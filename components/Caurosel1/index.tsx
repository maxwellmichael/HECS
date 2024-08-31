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
        title:'Electrical Equipments',
        description:'Empower Your Electrical Systems with ACB Expertise',
        imagePath:'/images/caurousel/slide_1.jpg',
    },
    {
        id:1,
        title:'Device Repair',
        description:'Empower Your Electrical Systems with ACB Expertise',
        imagePath:'/images/caurousel/slide_2.jpg',
    },
    // {
    //     id:3,
    //     title:'We are the largest consumer platform for energy and renewables 3',
    //     description:'Empower Your Electrical Systems with ACB Expertise',
    //     imagePath:'/images/caurousel/slide_3.jpg',
    // },
    {
        id:4,
        title:'Motor Repair',
        description:'Empower Your Electrical Systems with ACB Expertise',
        imagePath:'/images/caurousel/slide_4.jpg',
    },
]

export default function Component() {
  return (
    <section className="pb-20 pt-[86px] md:pt-[86px]">
      <div className="h-[288px] md:h-[700px] ">
        <Carousel
          theme={customTheme}
          onSlideChange={(index) => console.log("onSlideChange()", index)}
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
