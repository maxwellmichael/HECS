"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { Certification } from "@/types/certification";
import GlassCard from "@/components/Common/GlassCard";

interface SingleCertificationProps {
  certification: Certification;
  index?: number;
}

const SingleCertification = ({
  certification,
  index = 0,
}: SingleCertificationProps) => {
  const [previewImageFailed, setPreviewImageFailed] = useState(false);
  const pdfHref = encodeURI(certification.pdfUrl);
  const shouldRenderImage = Boolean(certification.image) && !previewImageFailed;

  return (
    <GlassCard index={index} density="float" className="p-4.5 md:p-5">
      <a
        href={pdfHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${certification.code} certificate in a new tab`}
        className="flex h-full flex-col rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho"
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/60 bg-white/70 dark:border-white/10 dark:bg-white/5">
          {shouldRenderImage ? (
            <Image
              src={certification.image}
              alt={`${certification.code} certificate preview`}
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
              className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              onError={() => setPreviewImageFailed(true)}
            />
          ) : (
            <object
              data={pdfHref}
              type="application/pdf"
              className="pointer-events-none h-full w-full"
              aria-label={`${certification.code} certificate PDF preview`}
            >
              <div className="flex h-full w-full items-center justify-center bg-white p-6 text-center text-regular text-waterloo dark:bg-blacksection dark:text-manatee">
                View {certification.code} certificate
              </div>
            </object>
          )}
        </div>

        <div className="mt-5 flex-1 text-center">
          <h3 className="text-itemtitle font-bold text-black dark:text-white">
            {certification.code}
          </h3>
          <p className="mt-2 text-regular font-medium text-primaryho dark:text-primaryLight">
            {certification.title}
          </p>
        </div>
      </a>
    </GlassCard>
  );
};

export default SingleCertification;
