"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import Button from "@/components/Common/Button";
import GlassPanel from "@/components/Common/GlassPanel";
import SingleCatalogItem from "./SingleCatalogItem";
import { CATEGORY_ICONS } from "./categoryIcons";
import { CatalogProduct, SubcategoryKey } from "@/types/productCatalog";
import { SUBCATEGORY_ORDER, getItems } from "./productsData";

const ITEMS_PER_PAGE = 12;

type Filter = SubcategoryKey | "all";

const navButtonClasses =
  "flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white/60 text-black shadow-solid-12 backdrop-blur-xl transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho disabled:pointer-events-none disabled:opacity-40 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:border-primaryho dark:hover:bg-primaryho";

const ProductDetail = ({ product }: { product: CatalogProduct }) => {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    const items = getItems(product, filter);
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q),
    );
  }, [product, filter, query]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / ITEMS_PER_PAGE),
  );
  const safePage = Math.min(currentPage, totalPages);

  const paginatedItems = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, safePage]);

  useEffect(() => setCurrentPage(1), [filter, query]);

  const tabs: { key: Filter; label: string }[] = [
    { key: "all", label: "All Components" },
    ...SUBCATEGORY_ORDER.map((sub) => ({
      key: sub.key as Filter,
      label: sub.label,
    })),
  ];

  return (
    <div className="space-y-8">
      {/* Hero panel */}
      <GlassPanel
        density="read"
        tint="from-primaryho/15"
        className="rounded-2xl"
      >
        <div className="p-6 md:p-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sectiontitle text-waterloo dark:text-manatee"
          >
            <Link
              href="/"
              className="transition-colors duration-300 hover:text-primaryho dark:hover:text-primaryLight"
            >
              Home
            </Link>
            <FaChevronRight aria-hidden className="h-2 w-2" />
            <Link
              href="/products"
              className="transition-colors duration-300 hover:text-primaryho dark:hover:text-primaryLight"
            >
              Products
            </Link>
            <FaChevronRight aria-hidden className="h-2 w-2" />
            <span
              className="font-medium text-black dark:text-white"
              aria-current="page"
            >
              {product.name}
            </span>
          </nav>

          <div className="mt-6 flex items-start gap-4">
            <span className="bg-primaryho/15 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-metatitle2 text-primaryho dark:bg-primaryho/20 dark:text-primaryLight">
              {CATEGORY_ICONS[product.id]}
            </span>
            <div>
              <h1 className="text-sectiontitle4 font-bold text-black dark:text-white md:text-sectiontitle3">
                {product.name}
              </h1>
              <p className="mt-3 max-w-2xl text-regular text-waterloo dark:text-manatee">
                {product.summary}
              </p>
            </div>
          </div>
        </div>
      </GlassPanel>

      {/* Controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilter(tab.key)}
              aria-pressed={filter === tab.key}
              className={`shrink-0 rounded-full px-4.5 py-2 text-sectiontitle font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho ${
                filter === tab.key
                  ? "bg-primary text-white shadow-solid-5 dark:bg-primaryho"
                  : "border border-stroke bg-white/50 text-blackho hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-white/5 dark:text-manatee dark:hover:border-primaryho/40 dark:hover:text-primaryLight"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-72">
          <FaSearch
            aria-hidden
            className="absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-waterloo dark:text-manatee"
          />
          <input
            type="text"
            placeholder="Search components..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-stroke bg-white/70 py-3 pl-11 pr-10 text-regular text-black backdrop-blur-sm transition-all duration-300 placeholder:text-waterloo focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-blacksection/70 dark:text-white dark:placeholder:text-manatee dark:focus:border-primaryho dark:focus:ring-primaryho/20"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-waterloo transition-colors duration-300 hover:text-black dark:text-manatee dark:hover:text-white"
            >
              <FaTimes className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Item grid */}
      <AnimatePresence mode="wait">
        {filteredItems.length > 0 ? (
          <motion.div
            key={`${filter}-${safePage}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {paginatedItems.map((item, index) => (
                <SingleCatalogItem
                  key={`${item.group}-${item.name}`}
                  item={item}
                  index={index}
                />
              ))}
            </div>

            {/* Pagination — controls only, no counts */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav
                  aria-label="Component pages"
                  className="flex items-center gap-2"
                >
                  <button
                    type="button"
                    onClick={() => setCurrentPage(safePage - 1)}
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
                        onClick={() => setCurrentPage(page)}
                        aria-label={`Go to page ${page}`}
                        aria-current={page === safePage ? "page" : undefined}
                        className={`h-10 w-10 rounded-full text-sectiontitle font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho ${
                          page === safePage
                            ? "bg-primary text-white shadow-solid-5 dark:bg-primaryho dark:text-white"
                            : "border border-stroke bg-white/60 text-black hover:border-primary hover:text-primary dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:border-primaryho dark:hover:text-primaryLight"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                  <button
                    type="button"
                    onClick={() => setCurrentPage(safePage + 1)}
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
            className="flex flex-col items-center justify-center rounded-2xl border border-stroke bg-white/50 py-16 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-stroke dark:bg-hoverdark">
              <FaSearch className="h-6 w-6 text-waterloo dark:text-manatee" />
            </div>
            <h4 className="mb-2 text-itemtitle font-bold text-black dark:text-white">
              No components found
            </h4>
            <p className="mb-6 max-w-md text-regular text-waterloo dark:text-manatee">
              No components match "{query}". Try a different search term or
              group.
            </p>
            <Button variant="primary" size="md" onClick={() => setQuery("")}>
              Clear Search
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <GlassPanel
        density="read"
        tint="from-primaryho/20"
        className="rounded-2xl"
      >
        <div className="flex flex-col items-start gap-6 p-7.5 md:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-itemtitle font-bold text-black dark:text-white">
              Need a component that isn't listed?
            </h2>
            <p className="mt-2 max-w-xl text-regular text-waterloo dark:text-manatee">
              Our sourcing team tracks down hard-to-find mechanical, electrical,
              instrumentation and automation spares. Send us your requirement
              and we'll quote it.
            </p>
          </div>
          <Button href="/contact" variant="primary" size="lg">
            Request a Quote
          </Button>
        </div>
      </GlassPanel>
    </div>
  );
};

export default ProductDetail;
