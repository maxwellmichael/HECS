'use client'

import Image from "next/image";

export default function ISOCertification() {
  const handleClick = () => {
    window.open("/iso/certificate.pdf", "_blank");
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 rounded p-4 mx-auto">
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
          <span onClick={handleClick} className="text-blue-600 underline cursor-pointer">
            View Certificate
          </span>
        </p>
      </div>
    </div>
  );
}
