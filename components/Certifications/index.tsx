"use client";

import React from "react";
import SectionHeader from "../Common/SectionHeader";
import certificationsData from "./certificationsData";
import SingleCertification from "./SingleCertification";

const CertificationsSection = () => {
  return (
    <>
      {/* <!-- ===== Certifications Start ===== --> */}
      <section id="certifications" className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <SectionHeader
            headerInfo={{
              title: "OUR CERTIFICATIONS",
              subtitle: "We Are Certified In",
              description: "",
            }}
          />

          <div className="mt-12.5 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-12.5">
            {certificationsData.map((certification, key) => (
              <SingleCertification
                index={key}
                certification={certification}
                key={key}
              />
            ))}
          </div>
        </div>
      </section>
      {/* <!-- ===== Certifications End ===== --> */}
    </>
  );
};

export default CertificationsSection;
