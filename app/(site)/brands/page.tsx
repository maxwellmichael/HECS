import BrandsSection from '@/components/BrandsSection'
import Hero from '@/components/Hero'
import React from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brands - Heliac Energii Controls Solutions",
  // other metadata
};

export default function BrandPage() {
  return (
    <main className='pb-8 md:pb-20 pt-[90px] md:pt-[102px]'>
        <BrandsSection/>
    </main>
  )
}
