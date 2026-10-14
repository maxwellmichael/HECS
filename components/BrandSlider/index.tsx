"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import brandData from "./brandData";
import SingleBrand from "./SingleBrand";
import SingleProduct from "./SingleProduct";

const PRODUCTS_PER_PAGE = 10;

const BrandSlider = () => {
  const [selectedBrand, setSelectedBrand] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const currentBrand = brandData[selectedBrand];

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return currentBrand.products;
    const query = searchQuery.toLowerCase();
    return currentBrand.products.filter((product) =>
      product.name.toLowerCase().includes(query),
    );
  }, [currentBrand, searchQuery]);

  /* ---- Pagination ---- */
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE),
  );
  const safePage = Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(() => {
    const start = (safePage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, safePage]);

  const rangeStart =
    filteredProducts.length === 0 ? 0 : (safePage - 1) * PRODUCTS_PER_PAGE + 1;
  const rangeEnd = Math.min(
    safePage * PRODUCTS_PER_PAGE,
    filteredProducts.length,
  );

  // Reset to page 1 whenever brand or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBrand, searchQuery]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // On small screens jump back to the top of the product panel
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      productsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  /* ---- Brand slider navigation ---- */
  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByDirection = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir * Math.round(el.clientWidth * 0.8),
      behavior: "smooth",
    });
  };

  const handleBrandSelect = (index: number) => {
    setSelectedBrand(index);
    setSearchQuery("");
  };

  const navButtonClasses =
    "flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/60 text-black shadow-solid-12 backdrop-blur-xl transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho disabled:pointer-events-none disabled:opacity-40 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:border-primaryho dark:hover:bg-primaryho";

  return (
    <div className="relative space-y-8">
      {/* Brand selector */}
      <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/50 p-6 shadow-solid-3 backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-blacksection/60">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent dark:from-white/5"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/25"
        />

        <div className="relative">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary dark:bg-primaryho" />
              <span className="text-metatitle font-semibold uppercase tracking-widest text-waterloo dark:text-manatee">
                Select a Brand
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByDirection(-1)}
                disabled={!canScrollLeft}
                aria-label="Scroll brands left"
                className={navButtonClasses}
              >
                <FaChevronLeft aria-hidden className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => scrollByDirection(1)}
                disabled={!canScrollRight}
                aria-label="Scroll brands right"
                className={navButtonClasses}
              >
                <FaChevronRight aria-hidden className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div
            ref={scrollerRef}
            className="no-scrollbar flex snap-x snap-proximity gap-4 overflow-x-auto scroll-smooth pb-2"
          >
            {brandData.map((brand, index) => (
              <SingleBrand
                key={brand.id}
                name={brand.name}
                logoImagepath={brand.logoImagepath}
                productCount={brand.products.length}
                selected={selectedBrand === index}
                index={index}
                onClick={() => handleBrandSelect(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Products section */}
      <motion.div
        key={selectedBrand}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        ref={productsRef}
        className="relative scroll-mt-28 overflow-hidden rounded-2xl border border-white/60 bg-white/40 p-6 shadow-solid-3 backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-blacksection/50 md:p-8"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent dark:from-white/5"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/25"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-8 right-6 h-16 w-32 rounded-full bg-primary/20 blur-2xl dark:bg-primaryho/25"
        />

        <div className="relative">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-itemtitle font-bold text-black dark:text-white">
                {currentBrand.name} Products
              </h3>
              <p className="mt-1 text-sectiontitle text-waterloo dark:text-manatee">
                {filteredProducts.length} of {currentBrand.products.length}{" "}
                products
              </p>
            </div>

            <div className="relative w-full md:w-80">
              <FaSearch className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-waterloo dark:text-manatee" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/60 bg-white/70 py-3 pl-11 pr-10 text-regular text-black backdrop-blur-sm transition-all duration-300 placeholder:text-waterloo focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-blacksection/70 dark:text-white dark:placeholder:text-manatee dark:focus:border-primaryho dark:focus:ring-primaryho/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-waterloo transition-colors duration-300 hover:text-black dark:text-manatee dark:hover:text-white"
                  aria-label="Clear search"
                >
                  <FaTimes className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              <motion.div
                key={`page-${safePage}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {paginatedProducts.map((product, index) => (
                    <SingleProduct
                      key={product.name}
                      name={product.name}
                      index={index}
                    />
                  ))}
                </div>

                {/* Pagination controls */}
                {totalPages > 1 && (
                  <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                    <p className="text-sectiontitle text-waterloo dark:text-manatee">
                      Showing {rangeStart}–{rangeEnd} of{" "}
                      {filteredProducts.length} products
                    </p>

                    <nav
                      aria-label="Product pages"
                      className="flex items-center gap-2"
                    >
                      <button
                        type="button"
                        onClick={() => goToPage(safePage - 1)}
                        disabled={safePage === 1}
                        aria-label="Previous page"
                        className={navButtonClasses}
                      >
                        <FaChevronLeft aria-hidden className="h-3.5 w-3.5" />
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            type="button"
                            onClick={() => goToPage(page)}
                            aria-label={`Go to page ${page}`}
                            aria-current={
                              page === safePage ? "page" : undefined
                            }
                            className={`h-10 w-10 rounded-full text-sectiontitle font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho ${
                              page === safePage
                                ? "bg-primary text-white shadow-solid-5 dark:bg-primaryho dark:text-white"
                                : "border border-white/60 bg-white/60 text-black hover:border-primary hover:text-primary dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:border-primaryho dark:hover:text-primaryLight"
                            }`}
                          >
                            {page}
                          </button>
                        ),
                      )}

                      <button
                        type="button"
                        onClick={() => goToPage(safePage + 1)}
                        disabled={safePage === totalPages}
                        aria-label="Next page"
                        className={navButtonClasses}
                      >
                        <FaChevronRight aria-hidden className="h-3.5 w-3.5" />
                      </button>
                    </nav>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-stroke dark:bg-hoverdark">
                  <FaSearch className="h-6 w-6 text-waterloo dark:text-manatee" />
                </div>
                <h4 className="mb-2 text-itemtitle font-bold text-black dark:text-white">
                  No products found
                </h4>
                <p className="mb-6 max-w-md text-regular text-waterloo dark:text-manatee">
                  {searchQuery
                    ? `No products match "${searchQuery}". Try a different search term.`
                    : "No products available for this brand."}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="rounded-full bg-primary px-6 py-3 text-regular font-medium text-white transition-all duration-300 hover:bg-primaryho focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho dark:bg-primaryho dark:hover:bg-primary"
                  >
                    Clear Search
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default BrandSlider;
