import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import Button from "../Common/Button";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[99]">
      {isVisible && (
        <Button
          variant="icon"
          size="sm"
          onClick={scrollToTop}
          ariaLabel="Scroll to top"
          className="h-10 w-10 !rounded-full bg-primary text-white shadow-solid-5 hover:bg-primaryho dark:bg-primaryho dark:hover:bg-primary"
        >
          <FaArrowUp />
        </Button>
      )}
    </div>
  );
}
