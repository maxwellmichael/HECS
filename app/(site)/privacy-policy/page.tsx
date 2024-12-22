import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy Page - Heliac Energii Controls Solutions",
  // description: "This is Docs page for Solid Pro",
  // other metadata
};

export default function PrivacyPolicy() {
  return (
    <section className="flex w-full flex-col items-center justify-start pb-16 pt-24 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32">
      <div className="w-full px-4 text-black lg:w-3/4">
        <h1 className="mb-4 text-3xl font-bold">Privacy Policy</h1>
        <p className="mb-2">Last updated: December 22, 2024</p>
        <p className="mb-4">
          Heliac Energii Controls Solutions makes every effort to ensure the
          accuracy of the information published in the online catalog on this
          website. However, Heliacenergii.com does not make any representations
          or warranties about the accuracy of the information, and all
          information is provided &quot;as is&quot; without any guarantees.
        </p>
        <p className="mb-8">
          The information in the online product catalog is subject to change
          without notice.
        </p>

        {/* <h2 className="mb-4 text-2xl font-semibold">
          Interpretation and Definitions
        </h2>

        <h3 className="mb-2 text-xl font-semibold">Interpretation</h3>
        <p className="mb-4">
          The words of which the initial letter is capitalized have meanings
          defined under the following conditions. The following definitions
          shall have the same meaning regardless of whether they appear in
          singular or in plural.
        </p> */}

        <h3 className="mb-2 text-xl font-semibold">
          What Information Do We Collect?
        </h3>
        <p className="mb-4">We collect your information when you:</p>
        <ul className="mb-4 list-inside list-disc">
          <li className="mb-2">Register on our website</li>
          <li className="mb-2">Place an order</li>
          <li className="mb-2">Fill out a form</li>
        </ul>

        <p className="mb-4">
          When ordering or registering, you may be asked to enter personal
          details such as:
        </p>
        <ul className="mb-4 list-inside list-disc">
          <li className="mb-2">Name</li>
          <li className="mb-2">Email address</li>
          <li className="mb-2">Mailing address</li>
          <li className="mb-2">Phone number</li>
          <li className="mb-2">Credit card information</li>
        </ul>
        <p className="mb-8">However, you can visit our website anonymously.</p>

        <h3 className="mb-2 text-xl font-semibold">
          What Do We Use Your Information For?
        </h3>
        <p className="mb-4">
          The information we collect from you may be used in the following ways:
        </p>
        <ul className="mb-8 list-inside list-disc">
          <li className="mb-2">
            <strong>Personalize your experience:</strong> To help us better meet
            your individual needs.
          </li>
          <li className="mb-2">
            <strong>Improve customer service:</strong> To respond more
            effectively to your customer service requests and support needs.
          </li>
          <li className="mb-2">
            <strong>Process transactions:</strong> Your information will not be
            sold, exchanged, transferred, or provided to any other company for
            any reason, except for the express purpose of completing your
            purchase.
          </li>
          <li className="mb-2">
            <strong>Send periodic emails:</strong> The email address provided
            may be used to send updates related to your order or to inform you
            about company news, product updates, and other information. You may
            opt-out of non-order related emails at any time.
          </li>
          <li className="mb-2">
            <strong>Improve our website:</strong> Based on your information and
            feedback, we continuously strive to improve our website and
            products.
          </li>
        </ul>

        <h3 className="mb-2 text-xl font-semibold">
          How Do We Protect Your Information?
        </h3>
        <p className="mb-4">
          We implement various security measures to maintain the security of
          your personal information when you place an order or access your
          personal details. These measures include:
        </p>
        <ul className="mb-4 list-inside list-disc">
          <li className="mb-2">Using a secure server.</li>
          <li className="mb-2">
            Encrypting all sensitive information through Secure Sockets Layer
            (SSL) technology to protect the transmission of personal data and other confidential content.
          </li>
          <li className="mb-2">
            Ensuring that only authorized personnel can access your personal
            information.
          </li>
        </ul>
        <p className="mb-8">
          Your personal information (such as credit card details) will not be
          stored after the transaction is completed.
        </p>

        <h3 className="mb-2 text-xl font-semibold">
          Do We Disclose Any Information to Other Parties?
        </h3>
        <p className="mb-8">
          We do not sell, trade, or transfer your personally identifiable
          information to outside parties, except to trusted third parties who
          help us operate our website or conduct business, provided they agree
          to keep this information confidential.
          <br />
          <div className="pt-3">
            We may also disclose your information when required by law, to
            enforce our website policies, or to protect our rights, property, or
            the safety of ourselves or others. Non-personally identifiable
            information may be shared with other parties for marketing,
            advertising, or other purposes.
          </div>
        </p>

        <h3 className="mb-2 text-xl font-semibold">Third-Party Links</h3>
        <p className="mb-8">
          Heliac Energii Controls Solutions does not review or control
          third-party websites linked to or from this website. We are not
          responsible for their content, and their inclusion does not imply
          endorsement. Your use of third-party websites is at your own risk and
          may be subject to their own terms of use.
        </p>

        <h3 className="mb-2 text-xl font-semibold">Your Consent</h3>
        <p className="mb-8">
          By using our website, you agree to this privacy policy.
        </p>

        <h3 className="mb-2 text-xl font-semibold">
          Changes to Our Privacy Policy
        </h3>
        <p className="mb-8">
          If we decide to change our privacy policy, we will post those changes
          on this page.
        </p>

        <h3 className="mb-2 text-xl font-semibold">Contact Us</h3>
        <p className="mb-4">
          If you have any questions regarding this Privacy Policy, feel free to
          contact us via email:
        </p>
        <ul className="mb-4 list-inside list-disc">
          <li className="mb-2">
            <strong>Email: </strong>inquiry@heliacenergii.com
          </li>
        </ul>
      </div>
    </section>
  );
}
