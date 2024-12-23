// pages/terms.js
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions Page - Heliac Energii Controls Solutions",
  description: "Terms & Conditions are subject to change",
  // other metadata
};

const TermsAndConditions = () => {
  return (
    <section className="mx-auto flex max-w-c-1390 flex-col items-center justify-start pb-16 pt-24 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32">
      <div className="w-full px-4 text-black lg:w-3/4">
        <h1 className="mb-4 text-3xl font-bold">Terms & Conditions</h1>
        <p className="mb-2">Last updated: December 22, 2024</p>
        <p className="mb-2 text-left text-black">
          Welcome to HeliacEnergii.com operated by Heliac Energii Controls
          Solutions.
        </p>
        <p className="mb-2 text-left text-black">
          Our mission is to provide you with the information and industrial
          automation parts you need in an efficient and timely manner. To
          facilitate this process, we require you to carefully read and agree to
          all parts of our policies and terms (referred to as &quot;terms&quot;
          hereinafter).
        </p>
        <p className="mb-2 text-left text-black">
          These terms apply to the use of the HeliacEnergii.com and to the sale
          of products to our clients .We reserve the right to modify these terms
          at any time without prior notice. The effective date of the latest
          revision is noted below. We encourage you to visit our website
          periodically to review any changes.
        </p>
        <p className="mb-8 text-left text-black">
          By using our website or purchasing products from Heliac Energii, you
          agree to be bound by these terms. If you do not agree to comply with
          these terms, you are prohibited from using the website or purchasing
          products from us.
        </p>
        <section className="mb-8">
          <h3 className="mb-2 text-xl font-semibold underline">
            1) Product Information and Pricing Policy
          </h3>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            Heliac Energii Controls Solutions strives to ensure the accuracy of
            all information presented in the Online Product Catalog on this
            website. However, the information is provided &quot;as-is,&quot;
            without any warranty, and may be subject to change without notice.
          </p>
          <h3 className="mb-1 text-lg font-semibold">Pricing</h3>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            Prices listed on our website are subject to change at any time prior
            to the acceptance of your order by Heliac Energii Controls Solutions
            The applicable price for your order will be based on the current
            quotation sheet at the time your order is accepted or any other
            agreed-upon pricing in writing. Unless otherwise specified in the
            quotation and agreed upon in writing, all prices exclude packing and
            shipping charges.
          </p>

          <h3 className="mb-1 text-lg font-semibold">
            Product Conditions and Variance
          </h3>
          <p className="mb-2 text-black last:mb-0 dark:text-manatee">
            We specialize in providing discontinued industrial components. If a
            material error is discovered in supply, product condition, or
            pricing that affects your pending order, we will notify you of the
            correction. You may then choose to either accept the correction or
            cancel your order.
          </p>
          <p className="mb-2 text-black last:mb-0 dark:text-manatee">
            If you opt to cancel and have already made a payment, Heliac Energii
            Controls Solutions will issue a refund equal to the amount paid.
          </p>
          <p className="mb-2 text-black last:mb-0 dark:text-manatee">
            We are committed to transparency and ensuring you receive accurate
            product and pricing information throughout your purchasing process.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="mb-2 text-xl font-semibold underline">
            2) Product Conditions and Warranty Information
          </h3>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            At Heliac Energii Controls Solutions , we offer a variety of
            products categorized by condition. Below is a summary of each
            category and the applicable warranty details:
          </p>
          <h3 className="mb-1 text-lg font-semibold">Used Products</h3>
          <ul className="mb-4 list-inside list-disc">
            <li className="mb-2">
              <strong>Condition:</strong> No original packaging; may be an older
              version or design. Products may show signs of use and may not
              include documentation or attachments.
            </li>
            <li className="mb-2">
              <strong>Warranty:</strong> 1 year provided by Heliac Energii
              Controls Solutions . Manufacturer&#39;s warranty and support do
              not apply unless otherwise agreed.
            </li>
          </ul>
          <h3 className="mb-1 text-lg font-semibold">Surplus New Products</h3>
          <ul className="mb-4 list-inside list-disc">
            <li className="mb-2">
              <strong>Condition:</strong> Original packaging may be opened,
              showing signs of marking, discoloration, or wear &amp; Tear . The
              product may be an older version or design and may lack
              documentation or attachments.
            </li>
            <li className="mb-2">
              <strong>Warranty:</strong> 1 year provided by Heliac Energii
              Controls Solutions . Manufacturer&#39;s warranty and support do
              not apply unless otherwise agreed.
            </li>
          </ul>

          <h3 className="mb-1 text-lg font-semibold">Brand New Products</h3>
          <ul className="mb-4 list-inside list-disc">
            <li className="mb-2">
              <strong>Condition:</strong>New parts and products sourced through
              distributors or official partners.
            </li>
            <li className="mb-2">
              <strong>Warranty:</strong> 1 year provided by Heliac Energii
              Controls Solutions. Manufacturer&#39;s warranty and support do not
              apply.
            </li>
          </ul>

          <h3 className="mb-1 text-lg font-semibold">Important Notes</h3>
          <ul className="mb-4 list-inside list-disc">
            <li className="mb-2">
              Heliac Energii Controls Solutions is{" "}
              <strong>not an authorized distributor</strong> of any Products
              listed on the website and is not affiliated with any listed
              manufacturer.
            </li>
            <li className="mb-2">
              <strong>
                Manufacturer&#39;s warranty and support are not applicable
              </strong>{" "}
              to any product sold by Heliac Energii Controls Solutions
            </li>
            <li className="mb-2">
              All products come with Heliac Energii Controls Solutions{" "}
              <strong>1-year warranty</strong> from the invoice date, unless
              otherwise agreed in writing.
            </li>
            <p className="mb-4 text-black last:mb-0 dark:text-manatee">
              We are committed to delivering reliable products backed by our
              dedicated support and warranty service.
            </p>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="mb-2 text-xl font-semibold underline">
            3) Order Acceptance and Cancellation Policy
          </h3>
          <h3 className="mb-1 text-lg font-semibold">Order Placement</h3>
          <p className="mb-2 text-black last:mb-0 dark:text-manatee">
            Customers may place orders via the website, email, phone, or fax.
            However, receipt of your purchase order by Heliac Energii Controls
            Solutions does not constitute acceptance of the order.
          </p>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            If there are discrepancies between the terms in your purchase order
            or other documents and Heliac Energii Controls Solutions policies,
            we may process the order on a case-by-case basis. Please note,
            Heliac Energii Controls Solutions policies and terms will always
            supersede any other terms or conditions provided elsewhere.
          </p>
          <h3 className="mb-1 text-lg font-semibold">Order Acceptance</h3>
          <p className="mb-2 text-black last:mb-0 dark:text-manatee">
            All orders are subject to product availability. Heliac Energii
            Controls Solutions reserves the right to:
          </p>
          <ul className="list-inside list-disc">
            <li className="mb-2">
              Limit or cancel the quantity of products available for purchase.
            </li>
            <li className="mb-2">
              Adjust quantities for special offers without prior notice.
            </li>
            <li className="mb-2">
              Reject any order without liability or prior notification.
            </li>
          </ul>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            Orders from new customers may require verification, which could
            delay processing.
          </p>
          <h3 className="mb-1 text-lg font-semibold">Order Cancellation</h3>
          <p className="mb-2 text-black last:mb-0 dark:text-manatee">
            Customers may cancel orders with written consent from Heliac Energii
            Controls Solutions, under the following conditions:
          </p>
          <ul className="list-inside list-disc">
            <li className="mb-2">
              <strong>In-Stock Products:</strong> Orders for products marked
              &quot;in stock&quot; in the order confirmation may be cancellable.
            </li>
            <li className="mb-2">
              <strong> Non-Stock Products:</strong> Orders for products with a
              status other than &quot;in stock&quot; in the order confirmation
              are non-cancellable and non-refundable.
            </li>
          </ul>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            In the event of cancellation of such orders, the customer will be
            responsible for any costs incurred by Heliac Energii Controls
            Solutions including procurement expenses and reasonable cancellation
            or replenishment fees.
          </p>
          <h3 className="mb-1 text-lg font-semibold">
            Rescheduling and Order Finalization
          </h3>
          <ul className="list-inside list-disc">
            <li className="mb-2">
              Requests to reschedule orders are subject to Heliac Energii
              Controls Solutions approval.
            </li>
            <li className="mb-2">
              Once an order has been handed over to the carrier, it cannot be
              cancelled or rescheduled.
            </li>
          </ul>
          <p className="mb-8 text-black last:mb-0 dark:text-manatee">
            This policy ensures clear communication and smooth order management,
            protecting both parties’ interests.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="mb-2 text-xl font-semibold underline">
            4) Terms of Payment
          </h3>
          <p className="mb-2 text-black last:mb-0 dark:text-manatee">
            Customers agree to pay the full amount of each invoice in accordance
            with Heliac Energii Controls Solutions payment terms. No
            counterclaims, offsets, or deductions are permitted. All prices are
            listed in US dollars, and any differences resulting from currency
            conversion into US dollars will be borne by the customer.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="mb-2 text-xl font-semibold underline">5) Tax</h3>
          <ul className="list-inside list-disc">
            <li className="mb-2">
              <strong> Domestic Trade (within India):</strong>
              Heliac Energii Controls Solutions is based in India Goa and all
              parts and goods delivered within India are subject to GST as
              required by law.
            </li>
            <li className="mb-2">
              <strong> International Trade:</strong>
              Customers are responsible for any applicable proforma invoices,
              PST, HST, GST, and brokerage fees. These charges will be settled
              upon delivery of the goods.
            </li>
          </ul>
          <p className="mb-2 text-left text-black">
            This policy ensures clarity on payment obligations and tax
            responsibilities for all transactions.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="mb-2 text-xl font-semibold underline">
            6) Delivery and Ownership Policy
          </h3>
          <p className="mb-2 text-left text-black">
            Shipping and Delivery Dates .Heliac Energii Controls Solutions
            strives to meet customers&#39; requested shipping and delivery
            dates.
          </p>
          <ul className="list-inside list-disc">
            <li className="mb-2">
              <strong>In-Stock Products:</strong>
              Orders for In-stock items will be shipped within 1-5 working days
              if payment is received in full.
            </li>
            <li className="mb-2">
              <strong>Pre-Purchase Products:</strong>
              These items will be shipped within the specified timeframe
              provided at the time of order.
            </li>
          </ul>
          <p className="mb-2 text-left text-black">
            Please note that all shipping and delivery dates are estimates.
            Heliac Energii Controls Solutions is not liable for any delays. For
            clarification, delivery is considered timely if the product is
            delivered within 30 days of the requested delivery date.
          </p>

          <h3 className="mb-1 text-lg font-semibold">Batch Delivery</h3>
          <p className="mb-2 text-left text-black">
            If an order includes multiple batches, delays in one batch do not
            entitle the customer to cancel other batches.
          </p>
          <p className="mb-4 text-left text-black">
            This policy ensures clarity on shipping timelines and order
            management for a seamless customer experience.
          </p>

          <h3 className="mb-2 text-lg font-bold underline">
            Ownership and Risk of Loss
          </h3>
          <h3 className="mb-1 text-lg font-semibold">Shipping Arrangements</h3>
          <p className="mb-2 text-left text-black">
            Unless otherwise specified by the customer, . Heliac Energii
            Controls Solutions will arrange the carrier and delivery route.
          </p>
          <ul className="list-inside list-disc">
            <li className="mb-2">
              <strong>Customer-Appointed Carrier:</strong>
              When the customer appoints a carrier, . Heliac Energii Controls
              Solutions will deliver the product to the carrier on a FOB origin,
              freight collect basis. At this point, ownership and the risk of
              loss or damage during transit transfer to the customer.
            </li>
            <li className="mb-2">
              Heliac Energii Controls Solutions -Arranged Shipments: For all
              other shipments, ownership and the risk of loss or damage transfer
              to the customer once the product is delivered to the designated
              destination (Delivery at destination, freight prepaid and
              additional freight).
            </li>
          </ul>

          <h3 className="mb-1 text-lg font-semibold">Export Controls</h3>
          <p className="mb-2 text-left text-black">
            All products sold are subject to Indian export control laws,
            regulations, and orders. International orders will comply with the
            Export Administration Regulations for export from India
          </p>
          <p className="mb-2 text-left text-black">The customer agrees to:</p>
          <ul className="list-inside list-disc">
            <li className="mb-2">
              Adhere to all applicable export laws and regulations, both Indian
              and foreign.
            </li>
            <li className="mb-2">
              Not export or transport products to prohibited or embargoed
              countries, or to any individual or entity listed as denied,
              blocked, or otherwise restricted.
            </li>
          </ul>
          <p className="mb-2 text-left text-black">
            The customer further certifies that they:
          </p>
          <ul className="list-inside list-disc">
            <li className="mb-2">Are not located in an embargoed country.</li>
            <li className="mb-2">Are not on any prohibited persons list.</li>
            <li className="mb-2">
              Are not legally barred from purchasing products or services under
              this agreement.
            </li>
          </ul>
          <p className="mb-2 text-left text-black">
            Customers are responsible for securing any necessary licenses for
            the import, export, or re- export of purchased products.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="mb-2 text-xl font-semibold underline">
            7) Warranty Terms
          </h3>
          <p className="mb-2 text-left text-black">
            Heliac Energii Controls Solutions provides a warranty for all
            products sold, valid for the duration specified on the invoice. The
            warranty terms are as follows:
          </p>

          <h3 className="mb-1 text-lg font-semibold">Warranty Period</h3>
          <ul className="list-inside list-disc">
            <li className="mb-2">
              The warranty period ranges from 3 months to 1 year, depending on
              the product, unless otherwise agreed upon.
            </li>
            <li className="mb-2">
              The warranty period begins on the invoice date.
            </li>
          </ul>

          <h3 className="mb-1 text-lg font-semibold">Warranty Coverage</h3>
          <ul className="list-inside list-disc">
            <li className="mb-2">
              TAs Heliac Energii Controls Solutions is not an authorized
              distributor, manufacturer warranties are not applicable. Customers
              should consult the manufacturer&#39;s website for additional
              details.
            </li>
            <li className="mb-2">
              Defective products must be reported to Heliac Energii Controls
              Solutions within the warranty period.
            </li>
          </ul>

          <h3 className="mb-1 text-lg font-semibold">
            Warranty Claims and Returns
          </h3>
          <ul className="list-inside list-disc">
            <li className="mb-2">
              If a product is found to be defective, customers may return it in
              accordance with Heliac Energii Controls Solutions return policy.
            </li>
            <li className="mb-2">
              Heliac Energii Controls Solutions will replace defective products
              with second-hand, used, or repaired products. Replacement is the
              sole obligation under this warranty.
            </li>
            <li className="mb-2">
              If no suitable replacement is available after reasonable attempts,
              Heliac Energii Controls Solutions will refund the purchase price.
            </li>
          </ul>

          <h3 className="mb-1 text-lg font-semibold">Warranty Exclusions</h3>
          <p className="mb-2 text-left text-black">
            The warranty does not cover defects or issues resulting from:
          </p>
          <ul className="list-inside list-disc">
            <li className="mb-2">Misuse, neglect, or improper installation.</li>
            <li className="mb-2">
              Unauthorized repairs, alterations, or improper testing.
            </li>
            <li className="mb-2">
              Accidents or external causes beyond Heliac Energii Controls
              Solutions control.
            </li>
            <li className="mb-2">
              Products with mismatched, removed, or defaced serial numbers or
              date codes.
            </li>
          </ul>

          <h3 className="mb-1 text-lg font-semibold">
            Limitations of Liability
          </h3>
          <p className="mb-2 text-left text-black">
            Except as expressly stated in these warranty terms, all implied
            warranties, including those of merchantability, fitness for a
            particular purpose, and non-infringement, are excluded to the
            maximum extent permitted by law.
          </p>
          <p className="mb-2 text-left text-black">
            This warranty constitutes the full extent Heliac Energii Controls
            Solutions liability for product defects and the customer’s sole
            remedy.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="mb-2 text-xl font-semibold underline">
            8) Return Policy
          </h3>
          <h3 className="mb-1 text-lg font-semibold">
            Return Material Authorization (RMA) Number
          </h3>
          <p className="mb-2 text-left text-black">
            No returns will be accepted without a unique RMA number issued by
            Heliac Energii Controls Solutions
          </p>

          <p className="mb-2 text-left text-black">
            To obtain an RMA number, the customer must either:
          </p>
          <ol className="list-inside" type="1">
            <li className="mb-2">
              Submit an online return authorization request.
            </li>
            <li className="mb-2">Email the assigned salesperson.</li>
          </ol>

          <p className="mb-2 text-left text-black">
            The following details are required:
          </p>
          <ul className="list-inside list-disc">
            <li className="mb-2">Customer name</li>
            <li className="mb-2">Applicable invoice number</li>
            <li className="mb-2">Product serial number</li>
            <li className="mb-2">Description of the issue</li>
          </ul>
          <p className="mb-2 text-left text-black">
            Once an RMA number is issued, the customer has 07 calendar days to
            return the product. Returns without a valid RMA, after the 07 day
            period, or without proper documentation, will be rejected.
          </p>
          <h3 className="mb-1 text-lg font-semibold">
            Defective Product Returns
          </h3>
          <p className="mb-2 text-left text-black">
            Defective products may be returned within the warranty period as
            outlined in the Warranty Terms. Heliac Energii Controls Solutions
            will determine whether to replace, repair, or refund the defective
            product.
          </p>

          <h3 className="mb-1 text-lg font-semibold">
            Non-Defective Product Returns
          </h3>
          <p className="mb-2 text-left text-black">
            Requests to return non-defective products must be made within 10
            calendar days of the invoice date. If approved, the product must be
            returned within 30 calendar days from the invoice date, in its
            original condition. Heliac Energii Controls Solutions will deduct a
            30% restocking fee, with the remaining amount refunded.
          </p>
          <p className="mb-2 text-left text-black">
            Products not meeting the return conditions or received after the
            30-day period will not be accepted.
          </p>

          <h3 className="mb-1 text-lg font-semibold">
            Returned Products Must Be Complete
          </h3>
          <p className="mb-2 text-left text-black">All returns must include:</p>
          <ul className="list-inside list-disc">
            <li className="mb-2">Original manufacturer boxes</li>
            <li className="mb-2">Packing materials</li>
            <li className="mb-2">
              Manuals, cables, and accessories provided with the shipment
            </li>
          </ul>
          <p className="mb-2 text-left text-black">
            Returns missing any components may be rejected or subject to an
            additional 30% restocking fee. The RMA number must be clearly noted
            on the shipping label. Do not write on the original manufacturer’s
            box.
          </p>
          <h3 className="mb-1 text-lg font-semibold">Shipping Costs</h3>
          <p className="mb-2 text-left text-black">
            Customers are responsible for return shipping costs.
          </p>
          <h3 className="mb-1 text-lg font-semibold">
            Transportation Insurance
          </h3>
          <p className="mb-2 text-left text-black">
            Customers are highly encouraged to obtain full insurance for the
            return shipment to cover any potential loss or damage. Heliac
            Energii Controls Solutions will not be liable for any damage or loss
            during transit.
          </p>
          <h3 className="mb-1 text-lg font-semibold">
            Proper Packaging Guidelines
          </h3>
          <p className="mb-2 text-left text-black">
            To prevent damage during transit, customers must ensure products are
            securely packed:
          </p>
          <ul className="list-inside list-disc">
            <li className="mb-2">
              Use packing foam, bubble wrap, and anti-static bags.
            </li>
            <li className="mb-2">
              Place each product in an individual shipping box when possible.
            </li>
            <li className="mb-2">
              If shipping multiple items in one box, separate each with
              protective materials.
            </li>
          </ul>
          <p className="mb-2 text-left text-black">
            Unprotected, crushed, or damaged products will not be accepted.
            Larger items may be palletized if appropriately secured. Returns
            failing to meet these guidelines will be rejected.
          </p>

          <h3 className="mb-1 text-lg font-semibold">
            Rejection or Acceptance of Incomplete or Damaged Products
          </h3>
          <p className="mb-2 text-left text-black">
            If a package from Heliac Energii Controls Solutions arrives damaged
            or incomplete, customers should refuse delivery from the carrier.
          </p>
          <p className="mb-2 text-left text-black">
            If the customer accepts the delivery, they must:
          </p>
          <ol className="list-inside" type="1">
            <li className="mb-2">
              Note any damage or missing parts on the carrier’s delivery record
              to allow Heliac Energii Controls Solutions to file a claim.
            </li>
            <li className="mb-2">
              Keep the product and original packaging in their received
              condition.
            </li>
            <li className="mb-2">
              Notify Heliac Energii Controls Solutions promptly by contacting
              customer service or their account manager to arrange for carrier
              inspection and pickup of the damaged or incomplete items.
            </li>
          </ol>

          <h3 className="mb-1 text-lg font-semibold">Important Notice</h3>
          <p className="mb-2 text-left text-black">
            Failure to report damage or missing parts within five (5) days of
            receipt, or to preserve the product and its packaging, will be
            considered as the customer accepting the product in good condition.
            In such cases, Heliac Energii Controls Solutions general return
            policy will apply, and no claims for damaged or incomplete products
            will be entertained.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="mb-2 text-xl font-semibold underline">
            9) Limitation of Liability
          </h3>
          <p className="mb-2 text-left text-black">
            Heliac Energii Controls Solutions is not liable for any of the
            following:
          </p>
          <ul className="list-inside list-disc">
            <li className="mb-2">Lost profits</li>
            <li className="mb-2">Promotional or manufacturing costs</li>
            <li className="mb-2">Administrative costs</li>
            <li className="mb-2">Data loss</li>
            <li className="mb-2">Removal or reinstallation costs</li>
            <li>Reputational damage</li>
            <li>Customer loss</li>
            <li>Punitive damages</li>
            <li>Intellectual property infringement</li>
            <li>Contract/order loss</li>
            <li>Any indirect, special, incidental, or consequential damages</li>
          </ul>
          <p className="mb-2 text-left text-black">
            Regardless of the nature of the claim (whether in contract, tort,
            warranty, or otherwise), the maximum liability of , Heliac Energii
            Controls Solutions will be limited to the purchase price paid for
            the affected products. , Heliac Energii Controls Solutions only
            remedy will be to issue a return or refund for the product in
            question.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="mb-2 text-xl font-semibold underline">
            10) Limitation of Use
          </h3>
          <p className="mb-2 text-left text-black">
            Products sold by , Heliac Energii Controls Solutions are not
            recommended or authorized for use in:
          </p>
          <ul className="list-inside list-disc">
            <li className="mb-2">Life support applications</li>
            <li className="mb-2">Surgical implants</li>
            <li className="mb-2">Nuclear applications</li>
            <li className="mb-2">Aircraft applications</li>
            <li className="mb-2">
              Any other application where failure of a single component could
              cause significant injury to persons or property
            </li>
          </ul>
          <p className="mb-2 text-left text-black">
            By purchasing and using these products, the customer assumes all
            risk. , Heliac Energii Controls Solutions and its affiliates will
            not be liable for any claims or damages arising from the use of
            products in these applications.
          </p>
          <p className="mb-2 text-left text-black">
            The customer agrees to indemnify , Heliac Energii Controls Solutions
            and its affiliates against any claims, damages, losses, costs, or
            liabilities arising from the use of products in such applications.
            The customer agrees to keep , Heliac Energii Controls Solutions and
            its affiliates safe from any damage resulting from such use.
          </p>
          <h3 className="mb-1 text-lg font-semibold">Software Usage:</h3>
          <p className="mb-2 text-left text-black">
            Use of the software (if any) associated with hardware products will
            be subject to the manufacturer&#39;s end-user license agreement
            (EULA).
          </p>
        </section>

        <section className="mb-8">
          <h3 className="mb-2 text-xl font-semibold underline">
            11) Software License
          </h3>
          <p className="mb-2 text-left text-black">
            Heliac Energii Controls Solutions only sells hardware products and
            does not resell software licenses. Some hardware products may
            include software, but if the customer requires a software license,
            it must be obtained directly from the manufacturer.
          </p>
          <p className="mb-2 text-left text-black">
            Heliac Energii Controls Solutions respects intellectual property and
            asks customers to do the same. The customer acknowledges that Heliac
            Energii Controls Solutions does not provide any operating system
            software or software license for the products sold. The customer is
            responsible for obtaining the necessary legitimate software
            licenses, maintenance, and upgrades from the manufacturer.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="mb-2 text-xl font-semibold underline">
            12) Force Majeure
          </h3>
          <p className="mb-2 text-left text-black">
            Heliac Energii Controls Solutions will not be liable for any delays
            in delivery or failure to perform its obligations due to causes
            beyond its reasonable control. These causes may include, but are not
            limited to:
          </p>
          <ul className="list-inside list-disc">
            <li className="mb-2">Product allocations</li>
            <li className="mb-2">Material shortages</li>
            <li className="mb-2">Labor disputes</li>
            <li className="mb-2">Transportation delays</li>
            <li className="mb-2">Natural disasters</li>
            <li className="mb-2">Acts or omissions of other parties</li>
            <li className="mb-2">Acts of civil or military authorities</li>
            <li className="mb-2">Government priorities</li>
            <li className="mb-2">Fire</li> <li className="mb-2">Strikes</li>
            <li className="mb-2">Floods</li>
            <li className="mb-2">Severe weather</li>
            <li className="mb-2">Computer interruptions</li>
            <li className="mb-2">Terrorism</li>
            <li className="mb-2">Epidemics</li>
            <li className="mb-2">Quarantine restrictions</li>
            <li className="mb-2">Riots</li> <li className="mb-2">War</li>
          </ul>
          <p className="mb-2 text-left text-black">
            In the event of such a delay, Heliac Energii Controls Solutions time
            for delivery and performance will be extended for the duration of
            the delay. Heliac Energii Controls Solutions may also, at its
            discretion, cancel the order or any remaining part of it without
            liability.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="mb-2 text-xl font-semibold underline">
            13) Website Use Policy
          </h3>
          <h3 className="mb-1 text-lg font-semibold">
            Content Ownership and Copyright
          </h3>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            All content on Heliac Energii Controls Solutions website, including
            but not limited to media, software, text, images, logos, trademarks,
            artwork, and other materials, is protected by copyright and other
            intellectual property laws. This content is owned or licensed by
            Heliac Energii Controls Solutions or the original creators. You may
            not copy, modify, distribute, or reproduce the content for
            commercial purposes without prior written consent from Heliac
            Energii Controls Solutions.
          </p>
          <h3 className="mb-1 text-lg font-semibold">Trademarks</h3>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            Heliac Energii Controls Solutions name, logo, images, and other
            trademarks are the property of Heliac Energii Controls Solutions.
            Unauthorized use of these trademarks is prohibited.
          </p>
          <h3 className="mb-1 text-lg font-semibold">License to Use Website</h3>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            Heliac Energii Controls Solutions grants you a limited license to
            access and use the website for personal, non-commercial use. You are
            not permitted to modify the content or violate any ownership
            statements. This license is automatically revoked if you violate any
            terms of use.
          </p>
          <h3 className="mb-1 text-lg font-semibold">
            Website Use Restrictions
          </h3>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            You may not reproduce, distribute, or modify the website's content
            without permission. You are also prohibited from attempting
            unauthorized access to the website or using automated systems to
            copy content, monitor activity, or interfere with the website’s
            functionality.
          </p>
          <h3 className="mb-1 text-lg font-semibold">User Submissions</h3>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            Except for information subject to Heliac Energii Controls Solutions
            privacy policy, any information you submit to the website will be
            considered non-confidential. Heliac Energii Controls Solutions may
            use that information for its business purposes. You are prohibited
            from submitting harmful, defamatory, or inappropriate content.
          </p>
          <h3 className="mb-1 text-lg font-semibold">
            Accuracy of Information and Disclaimer
          </h3>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            While Heliac Energii Controls Solutions strives to provide accurate
            content, there may be changes, errors, or omissions. The website
            content is provided "as is," and Heliac Energii Controls Solutions
            makes no representations or warranties regarding its accuracy,
            completeness, or timeliness. Heliac Energii Controls Solutions and
            its representatives disclaim all implied warranties, including
            fitness for a particular purpose or non-infringement.
          </p>
          <h3 className="mb-1 text-lg font-semibold">
            Limitation of Liability
          </h3>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            Heliac Energii Controls Solutions and its affiliates are not
            responsible for any damages arising from your access to or use of
            the website, whether direct or indirect. Your use of the website is
            at your own risk.
          </p>
          <h3 className="mb-1 text-lg font-semibold">
            Links to Third-Party Websites
          </h3>
          <p className="mb-4 text-black last:mb-0 dark:text-manatee">
            Heliac Energii Controls Solutions does not control or review links
            to third-party websites and is not responsible for their content.
            Use of such websites is at your own risk and may be subject to their
            terms of use.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="mb-2 text-xl font-semibold underline">
            14) Privacy and Security
          </h3>
          <p className="mb-2 text-black last:mb-0 dark:text-manatee">
            Heliac Energii Controls Solutions is committed to protecting your
            privacy. The information we collect from you depends on your
            activities and usage of our website. Certain services on the website
            may require you to register or provide personally identifiable
            information (&quot;Personal and Account Information&quot;) to
            interact with us. This includes:
          </p>
          <ul className="list-inside list-disc">
            <li className="mb-2">
              Your name, company name, account number, address, phone number,
              email address
            </li>
            <li className="mb-2">
              Other personally identifiable information such as your industry,
              purchase history, IP address, or any other information that allows
              us to contact you
            </li>
          </ul>
          <h3 className="mb-1 text-lg font-semibold">
            Collection of Information:
          </h3>
          <ul className="list-inside list-disc">
            <li className="mb-2">
              <strong>Browsing Information:</strong> When you browse our
              website, we may collect your IP address, referral website, browser
              type, and monitor your activities. This helps us provide a more
              personalized shopping experience.
            </li>
            <li className="mb-2">
              <strong>Registration Information:</strong> When you register on
              the website, we collect your username, password, email address,
              security questions, and answers to protect your account. If you
              forget your password, we will use your security answers to
              identify you as the account user. You should keep your username
              and password secure.
            </li>
            <li className="mb-2">
              <strong>Purchase Information:</strong> When you make a purchase,
              we collect your name, address, and payment information to process
              the order. We may also collect your IP address and data from
              &quot;cookies&quot; (such as your purchase history and login data)
              to personalize your shopping experience. To add items to your
              cart, your browser must accept cookies.
            </li>
            <li className="mb-2">
              <strong>Communication Information:</strong> If you contact us
              through the website, we collect your email address and any
              information you provide to respond to your queries.
            </li>
          </ul>
          <p className="mb-2 text-black last:mb-0 dark:text-manatee">
            If you have any questions about our privacy practices or the use of
            cookies, please contact us in Email or call us directly.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="mb-2 text-xl font-semibold underline">15) Others</h3>
          <p className="mb-2 text-left text-black">
            This Policy and the Terms may not be modified or canceled without
            the written consent of Heliac Energii Controls Solutions Any
            provisions of this Policy and the Terms are subject to the local
            jurisdiction. If any provision is found to be prohibited or
            unenforceable in a given jurisdiction, it will be invalid to the
            extent required by the injunction or unenforceability in that
            jurisdiction. However, this will not affect the remaining provisions
            of the Terms or their validity and enforceability in other
            jurisdictions.
          </p>
          <p className="mb-2 text-left text-black">
            The provisions of this Policy and the Terms are intended solely for
            the parties to the agreement and do not confer any rights, benefits,
            or claims to any third parties outside of the agreement.
          </p>
          <p className="mb-2 text-left text-black">
            Heliac Energii Controls Solutions holds the final interpretation and
            management rights of the provisions of this Policy and Terms. These
            Terms shall be governed by the laws of India and will be subject to
            the jurisdiction of the District Court of Goa , India
          </p>
        </section>
        <div className="mt-4 w-full flex items-center justify-center">
          <small className="text-center font-bold">
            Terms & Conditions are subject to change.
          </small>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
