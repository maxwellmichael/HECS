"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useForm, Controller } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Heliac Energii Controls Solutions",
  // description: "Terms & Conditions are subject to change",
  // other metadata
};

const Contact = () => {
  // const [hasMounted, setHasMounted] = React.useState(false);
  // React.useEffect(() => {
  //   setHasMounted(true);
  // }, []);
  // if (!hasMounted) {
  //   return null;
  // }

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm();

  const [isLoading, setLoading] = useState(false);

  const handleFormSubmit = (formData: any) => {
    setLoading(true);
    const newData = { ...formData, current_year: new Date().getFullYear() };
    console.log(newData);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID as string,
        newData,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string,
        },
      )
      .then(
        () => {
          router.push('/')
          // reset();
          toast.success(
            `Thank you! Your message has been sent successfully. We'll get back to you shortly.`,
          );
        },
        (error) => {
          console.log("FAILED...", error);
          toast.error("Oops! Something went wrong. Please try again later.");
        },
      )
      .finally(() => {
        setLoading(false);
      });
  };

  const router = useRouter();

  return (
    <>
      <section id="support" className="px-0 md:px-8 2xl:px-0">
        <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
          <div className="absolute bottom-[-255px] left-0 -z-1 h-full w-full">
            <Image
              src="./images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
              fill
            />
            <Image
              src="./images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
              fill
            />
          </div>

          <div className="flex flex-col-reverse flex-wrap gap-8 md:flex-row md:flex-nowrap md:justify-between xl:gap-20">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full rounded-lg bg-white p-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black md:w-3/5 lg:w-3/4 xl:p-15"
            >
              <h2 className="mb-15 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                Send a message
              </h2>

              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="mb-7.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                  <div className="w-full lg:w-1/2">
                    <input
                      type="text"
                      disabled={isLoading}
                      placeholder="Full name"
                      className={`w-full border bg-transparent pb-3.5  ${
                        errors.fullName
                          ? "focus:placeholder:text-red border-red-500 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500"
                          : "border-stroke focus:placeholder:text-black"
                      }`}
                      {...register("fullName", { required: true })}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                        Full name is required.
                      </p>
                    )}
                  </div>

                  <div className="w-full lg:w-1/2">
                    <input
                      type="email"
                      disabled={isLoading}
                      placeholder="Email"
                      className={`w-full border-b bg-transparent pb-3.5 ${
                        errors.email
                          ? "focus:placeholder:text-red border-red-500 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500"
                          : "border-stroke focus:placeholder:text-black"
                      }`}
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                        Email is required.
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-7.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                  <div className="w-full lg:w-1/2">
                    <input
                      type="text"
                      disabled={isLoading}
                      placeholder="Company name"
                      className={`w-full border-b bg-transparent pb-3.5 ${
                        errors.companyName
                          ? "focus:placeholder:text-red border-red-500 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500"
                          : "border-stroke focus:placeholder:text-black"
                      }`}
                      {...register("companyName", { required: true })}
                    />
                    {errors.companyName && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                        Company name is required.
                      </p>
                    )}
                  </div>

                  <div className="w-full lg:w-1/2">
                    <Controller
                      name="phoneNumber"
                      control={control}
                      rules={{
                        validate: (value: any) => isValidPhoneNumber(value),
                        required: true,
                      }}
                      render={({ field: { onChange, value } }) => (
                        <PhoneInput
                          disabled={isLoading}
                          value={value}
                          onChange={onChange}
                          autoFormat
                          defaultCountry="IN"
                          id="phoneNumber"
                          placeholder="Phone number"
                          className={`w-full border border-stroke bg-transparent px-2 focus:placeholder:text-black ${
                            errors["phoneNumber"]
                              ? "focus:placeholder:text-red border-red-500 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500"
                              : "border-stroke focus:placeholder:text-black"
                          }`}
                          inputClassName="bg-transparent w-full focus:outline-none" // Additional styling for input
                        />
                      )}
                    />
                    {errors["phoneNumber"] && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                        Phone number is invalid.
                      </p>
                    )}

                    {/* <input
                      type="text"
                      placeholder="Phone number"
                      className={`w-full border bg-transparent pb-3.5  ${
                        errors.mobile
                          ? "focus:placeholder:text-red border-red-500 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500"
                          : "border-stroke focus:placeholder:text-black"
                      }`}
                      {...register("mobile", { required: true })}
                    />
                    {errors.mobile && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                        Mobile is required.
                      </p>
                    )} */}
                  </div>
                </div>

                <div className="mb-7.5 w-full">
                  <input
                    disabled={isLoading}
                    type="text"
                    placeholder="Subject"
                    className={`w-full border border-stroke bg-transparent pb-3 focus:placeholder:text-black`}
                    {...register("subject")}
                  />
                </div>

                <div className="mb-7.5 flex">
                  <textarea
                    placeholder="Message"
                    disabled={isLoading}
                    rows={4}
                    className="w-full border-b border-stroke bg-transparent focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                    {...register("message")}
                  ></textarea>
                </div>

                <div className="flex flex-wrap xl:justify-between ">
                  <div className="mb-0 flex w-full items-start md:mb-0">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="mt-1.5 h-5 w-5 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                      {...register("agree", { required: true })}
                    />

                    <label
                      htmlFor="default-checkbox"
                      className="flex max-w-[425px] cursor-pointer select-none items-start pl-3 pt-1"
                    >
                      I agree to&nbsp;
                      <span className="font-medium text-blue-600 underline hover:no-underline dark:text-blue-500">
                        <Link href={"/privacy-policy"}>Privacy Policy</Link>
                      </span>
                      .
                    </label>
                  </div>
                  <div className="mb-7.5 mt-1 w-full">
                    {errors.agree && (
                      <p className="mt-0 text-sm text-red-600 dark:text-red-500">
                        Please agree to continue.
                      </p>
                    )}
                  </div>

                  <button
                    aria-label="send message"
                    className="inline-flex items-center gap-2.5 rounded-full bg-primary px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-primaryho dark:bg-btndark"
                  >
                    {!isLoading ? "Send Message" : "Please wait..."}

                    {!isLoading ? (
                      <svg
                        className="fill-white"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                          fill=""
                        />
                      </svg>
                    ) : (
                      <span className="loader"></span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>

            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 2, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full md:w-2/5 md:p-5.5 lg:w-[40%] xl:pt-15"
            >
              <h2 className="mb-12.5 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                Find us
              </h2>

              <div className="w-4/5 mb-7">
                <h3 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
                  Our Location
                </h3>
                <p>
                  Heliac Energii Controls Solutions,<br />
                  H.No.184,<br/>
                  Opposite Miracles School,<br/>
                  Pangulna,<br />
                  Sanguem Goa - 403704,<br />
                  India.
                </p>
              </div>
              <div className="mb-7 w-4/5">
                <h3 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
                  Email Address
                </h3>
                <p>
                  <a href="mailto: inquiry@heliacenergii.com">
                    inquiry@heliacenergii.com
                  </a>
                </p>
              </div>
              <div>
                <h4 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
                  Phone Number
                </h4>
                <p>
                  <a href="tel://+00918411981840">0091 - 8411981840</a>
                </p>
                <p>
                  <a href="tel://+00918793823181">0091 - 8793823181</a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== Contact End ===== --> */}
    </>
  );
};

export default Contact;
