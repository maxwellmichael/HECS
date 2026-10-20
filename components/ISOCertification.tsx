"use client";

import Image from "next/image";
import Button from "./Common/Button";

export default function ISOCertification() {
  const handleClick = () => {
    window.open("/iso/certificate.pdf", "_blank");
  };

  return (
    <div className="mx-auto flex flex-col items-center gap-4 rounded p-4 md:flex-row">
      <Image
        src="/iso/badge.jpg"
        alt="ISO 9001 Certified"
        width={80}
        height={80}
      />
      <div>
        <p className="text-center md:text-start">
          We are <strong>ISO 9001:2015</strong> certified for Quality
          Management, certified by KSR Certification.{" "}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClick}
            className="underline"
          >
            View Certificate
          </Button>
        </p>
      </div>
    </div>
  );
}
