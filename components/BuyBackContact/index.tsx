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
import { Button } from "flowbite-react";
import { FaFileDownload } from "react-icons/fa";

const BuyBackContact = () => {
  /**
   * Source: https://www.joshwcomeau.com/react/the-perils-of-rehydration/
   * Reason: To fix rehydration error
   */
  // const [hasMounted, setHasMounted] = React.useState(false);
  // React.useEffect(() => {
  //   setHasMounted(true);
  // }, []);
  // if (!hasMounted) {
  //   return null;
  // }

  const handleDownload = () => {
    // Path to the file in the public folder
    const fileUrl = "/downloads/sample.xlsx";

    // Create a temporary <a> element and trigger the download
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "sample.xlsx"; // Suggested file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`File Downloaded Successfully.`);
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm();

  const [isLoading, setLoading] = useState(false);

  const handleFormSubmit = (formData: any, event: any) => {
    setLoading(true);
    const newData = { ...formData, current_year: new Date().getFullYear() };
    console.log(newData);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_BUYBACK_TEMPLATE_ID as string,
        event.target,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string,
        },
      )
      .then(
        () => {
          router.push("/");
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
      {/* <!-- ===== BuyBackContact Start ===== --> */}
      <section id="support" className="px-4 md:px-8 2xl:px-0 w-full">
        <div className="relative mx-auto max-w-c-1390 px-1.5 md:px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
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
              className="animate_top mx-auto w-full rounded-lg bg-white p-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black md:w-3/5 lg:w-3/4 xl:p-15"
            >
              <h2 className="mb-2 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                Buy Back
              </h2>
              <p className="mb-15">
                Transform your industrial surplus into value with our
                streamlined buyback solutions.
              </p>

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
                    type="text"
                    disabled={isLoading}
                    placeholder="Brand name"
                    className={`w-full border-b bg-transparent pb-3.5 ${
                      errors.brandName
                        ? "focus:placeholder:text-red border-red-500 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500"
                        : "border-stroke focus:placeholder:text-black"
                    }`}
                    {...register("brandName", { required: true })}
                  />
                  {errors.brandName && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                      Company name is required.
                    </p>
                  )}
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

                {/* <div className="mb-3.5 flex w-full flex-col items-start items-center justify-start justify-center">
                  <div className="flex w-full justify-between">
                    <label
                      className="text-md mb-2 block text-start font-medium text-gray-900 dark:text-white"
                      aria-label="fileUpload"
                    >
                      Upload Stock Details (Part No, Quantities...)
                    </label>

                    <div></div>
                  </div>
                  <label
                    aria-label="fileUpload"
                    className={`flex h-44 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-100 hover:bg-zumthor ${
                      errors["fileUpload"]
                        ? "border-red-500"
                        : "border-primaryho"
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <svg
                        className="mb-4 h-8 w-8 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      {selectedFile && selectedFile != null ? (
                        <p className="text-md text-black">
                          <div className="me-2 flex items-center justify-center rounded-full bg-primaryho px-2.5 py-1 text-sm font-semibold text-white">
                            <span className="mr-2.5 rounded-full bg-white p-1">
                              <Image
                                src="/images/logo/excel.png"
                                width={15}
                                height={15}
                                alt="Picture of the Excel"
                              />
                            </span>
                            {selectedFile.name}
                          </div>
                        </p>
                      ) : (
                        <>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            CSV, XLSX or XLS (MAX. 25MB)
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      id="fileUpload"
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      className="hidden"
                      {...register("fileUpload", {
                        required: "Please select a file.",
                        onChange: (
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                          const file = event.target.files?.[0];
                          setSelectedFile(file ? file : null);
                        },
                      })}
                    />
                  </label>
                  <div className="w-full">
                    {errors["fileUpload"] && (
                      <p className="mt-1 text-start text-sm text-red-600 dark:text-red-500">
                        Please select a file to continue.
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-7.5 flex h-auto w-full flex-col md:flex-row items-center justify-between rounded bg-zumthor p-5">
                  <div className="flex w-[70%] flex-col items-start justify-start">
                    <div className="flex w-full items-center justify-start">
                      <Image
                        src="/images/logo/excel.png"
                        width={34}
                        height={34}
                        alt="Picture of the Excel"
                      />
                      <h5 className="text-md pl-5 font-bold text-black">
                        Example File
                      </h5>
                    </div>
                    <p className="py-1.5 text-center md:text-start">
                      You can download the attached example and use that as a
                      starting point for your own file.
                    </p>
                  </div>

                  <div className="w-auto">
                    <Button color="light" onClick={handleDownload}>
                      <FaFileDownload className="mr-2 h-5 w-5" />
                      Download
                    </Button>
                  </div>
                </div> */}

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
          </div>
        </div>
      </section>
      {/* <!-- ===== BuyBackContact End ===== --> */}
    </>
  );
};

export default BuyBackContact;
