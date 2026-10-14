import { Metadata } from "next";
import ErrorSection from "@/components/Error";

export const metadata: Metadata = {
  title: "Page Not Found | Heliac Energii Controls Solutions",
  description:
    "The page you are looking for does not exist. Return to the homepage or contact us for assistance.",
};

const ErrorPage = () => <ErrorSection />;

export default ErrorPage;