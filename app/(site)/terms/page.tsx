// pages/terms.js
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions Page - Heliacenergii",
  // description: "This is Docs page for Solid Pro",
  // other metadata
};

const TermsAndConditions = () => {
  return (
    <section className="flex w-full flex-col items-center justify-start pb-16 pt-24 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32">
      <div className="w-full px-4 lg:w-3/4">
        <h1 className="mb-6 text-center text-hero font-bold text-black">
          Terms & Conditions
        </h1>
        <p className="para2 text-center font-bold text-black">
          Welcome to Heliacenergii. Our website, offers 100% digital products
          and services under these terms and conditions. By accessing or using
          our site, you agree to be bound by these terms.
        </p>
        <section className="mt-8">
          <h2 className="mt-7.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">
            Quotes
          </h2>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            A quote is valid for 30 days, subject to prior sales.
          </p>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            All prices are in USD and require 100% advance payment unless
            specified.
          </p>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            Funds must be received in full to avoid cancellation of the
            warranty.
          </p>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            Upon issuance of the Pro-Forma Invoice, payment must be received in
            our bank account within 7 working days, or we reserve the right to
            cancel the order.
          </p>
        </section>
        <section className="mt-1">
          <h2 className="mt-7.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">
            Shipping and Handling
          </h2>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            Shipping and handling costs, if applicable, will be added at the
            time of your order. Location: Exworks and TO be advised.
          </p>
        </section>

        <section className="mt-1">
          <h2 className="mt-7.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">
            Repair Orders
          </h2>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            Cards should be free from physical damages or burns. If any card is
            found to be not repairable, there will be an inspection charge of
            $300 per card. Cards with physical damages or burns will be subject
            to a handling fee of $200 per card.
          </p>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            Attestation of any documents or issuance of COO from the chamber of
            commerce will be charged at $150 per document. COO will be issued
            from UAE.
          </p>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            We will not sell parts destined for USA/UAE embargoed countries, and
            the country of end-use must be mentioned in the order. All UAE
            orders are subject to a 5% custom/VAT as applicable.
          </p>
        </section>

        <section className="mt-1">
          <h2 className="mt-7.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">
            Supply Orders
          </h2>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            Both Unused and Rebuilt orders are supplied in standard packaging.
            All parts supplied in REBUILT/REPAIRED categories are different from
            the original fit and form. Our standard supply condition and
            warranty terms apply to all orders unless specified.
          </p>
        </section>

        <section className="mt-1">
          <h2 className="mt-7.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">
            Warranty Terms
          </h2>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            We warrant that from the date of delivery, for a period mentioned in
            the warranty document provided with the supplied part, all UNUSED /
            REBUILT goods will conform in all material respects with their
            description and any applicable specification.
          </p>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            We warrant that from the point of delivery, all Repairs will accord
            with their description and/or remain functional, subject to the
            performance of the Repair Item as mentioned in the warranty document
            provided with the part.
          </p>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            The customer must give written notice to us during the respective
            warranty period if some or all of the goods or repairs do not comply
            with the warranty clause.
          </p>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            We will be given a reasonable time and opportunity to provide online
            troubleshooting and examination of such goods.
          </p>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            We take care of warranty return shipping costs both ways if an issue
            with supply/repair is reported within one month from the date of
            supply. We will take care of one-way shipping cost if an issue with
            supply/repair is reported within three months from the date of
            supply.
          </p>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            If an issue is reported after three months from the date of supply,
            the customer will have to take care of shipment costs both ways.
          </p>
          <p className="mb-1 text-black last:mb-0 dark:text-manatee">
            We shall not be liable for failure of Goods or Repairs to comply
            with the warranty if:
          </p>
          <ul className="w-full list-disc text-sectiontitle text-titlebgdark pl-4 mb-4">
            <li className="mb-1">
              The Customer, and/or end user failed to follow our oral or written
              instructions regarding storage, commissioning, installation, use,
              and maintenance of the Goods and/or Repair Items.
            </li>
            <li className="mb-1">
              The Customer and/or end user alters or repairs such Goods or
              Repair Items without our consent.
            </li>
            <li className="mb-1">
              The defect arises due to fair wear and tear, willful damage,
              negligence, or abnormal storage or working conditions.
            </li>
          </ul>
        </section>

        <section className="mt-1">
          <h2 className="mt-7.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">Return and Cancellation Policy</h2>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee"> 
            Our return policy applies to incorrect or returned orders. Any
            product discrepancies or damages must be reported within 24 hours of
            receipt. Return requests are accepted up to 14 calendar days from
            the date of receipt.
          </p>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            All returns must be accompanied by a valid RMA number and arrive at
            our warehouse within 7 days from the issue of the RMA number. DOA
            items must be claimed within 7 days of receipt.
          </p>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            Freight charges (both ways) are the responsibility of the buyer.
            Credit may be issued for returns and cancellations at our discretion
            and may be subject to a minimum restocking fee of 30%. A copy of the
            invoice must be included with all returned items.
          </p>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            A service charge of 2% per month will be added to all past due
            amounts.
          </p>
        </section>
      </div>
    </section>
  );
};

export default TermsAndConditions;
