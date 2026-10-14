import type { Certification } from "@/types/certification";

const certificationsData: Certification[] = [
  {
    id: 1,
    code: "ISO 9001:2015",
    title: "Quality Management",
    image: "/images/certifications/iso-9001.png",
    pdfUrl:
      "/certifications/HELIAC ENERGII CONTROLS SOLUTIONS ISO 9001 - 2015.pdf",
  },
  {
    id: 2,
    code: "ISO 14001:2015",
    title: "Environmental Management",
    image: "/images/certifications/iso-14001.png",
    pdfUrl: "/certifications/HELIAC ENERGII CONTROLS SOLUTIONS 14.pdf",
  },
  {
    id: 3,
    code: "ISO 45001:2018",
    title: "Occupational Health & Safety",
    image: "/images/certifications/iso-45001.png",
    pdfUrl: "/certifications/HELIAC ENERGII CONTROLS SOLUTIONS 45.pdf",
  },
];

export default certificationsData;
