import { Metadata } from "next";
import BuyBackContact from "@/components/BuyBackContact";
import BuyBackHero from "@/components/BuyBackContact/BuyBackHero";

export const metadata: Metadata = {
  title: "Buy Back | Heliac Energii Controls Solutions",
  description:
    "Sell your unused industrial surplus — hydraulics, pneumatics, electrical, instrumentation and automation spares — for a fair, transparent buy-back valuation within 24 hours.",
};

const BuyBackPage = () => {
  return (
    <>
      <BuyBackHero />
      <BuyBackContact />
    </>
  );
};

export default BuyBackPage;
