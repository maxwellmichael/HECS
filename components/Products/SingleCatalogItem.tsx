"use client";

import React from "react";
import Link from "next/link";
import {
  FaBolt,
  FaChevronRight,
  FaCog,
  FaMicrochip,
  FaTachometerAlt,
} from "react-icons/fa";
import GlassCard from "@/components/Common/GlassCard";
import { CatalogItemWithGroup, SubcategoryKey } from "@/types/productCatalog";
import { SUBCATEGORY_LABELS } from "./productsData";

/* Per-group identity: icon + token accent (badge & chip share it) */
const GROUP_META: Record<
  SubcategoryKey,
  { icon: React.ReactNode; accent: string }
> = {
  mechanical: {
    icon: <FaCog aria-hidden />,
    accent:
      "bg-primaryho/10 text-primaryho dark:bg-primaryho/15 dark:text-primaryLight",
  },
  electrical: {
    icon: <FaBolt aria-hidden />,
    accent: "bg-titlebg2/25 text-black dark:bg-titlebg2/15 dark:text-titlebg2",
  },
  electronics_control: {
    icon: <FaMicrochip aria-hidden />,
    accent: "bg-meta/10 text-meta dark:bg-meta/15 dark:text-meta",
  },
  instrumentation: {
    icon: <FaTachometerAlt aria-hidden />,
    accent:
      "bg-primary/10 text-primary dark:bg-primaryLight/15 dark:text-primaryLight",
  },
};

interface SingleCatalogItemProps {
  item: CatalogItemWithGroup;
  index?: number;
}

const SingleCatalogItem = ({ item, index = 0 }: SingleCatalogItemProps) => {
  const meta = GROUP_META[item.group];

  return (
    <GlassCard
      index={Math.min(index, 7)}
      density="float"
      className="p-5 md:p-6"
    >
      {/* Header row — icon badge + compact group chip */}
      <div className="flex items-start justify-between gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-regular transition-transform duration-300 group-hover:scale-110 ${meta.accent}`}
        >
          {meta.icon}
        </span>
        <span
          className={`self-start whitespace-nowrap rounded-full px-2.5 py-1 text-metatitle font-semibold uppercase tracking-widest ${meta.accent}`}
        >
          {SUBCATEGORY_LABELS[item.group]}
        </span>
      </div>

      {/* Title */}
      <h4 className="mt-4 text-regular font-semibold leading-snug text-black dark:text-white">
        {item.name}
      </h4>

      {/* Summary — flex-1 equalises card heights across each row */}
      <p className="mt-2 flex-1 text-sectiontitle text-waterloo dark:text-manatee">
        {item.summary}
      </p>

      {/* Footer — conversion path */}
      <div className="mt-4 border-t border-white/50 pt-3.5 dark:border-white/10">
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 rounded-full text-metatitle font-semibold uppercase tracking-widest text-primaryho underline-offset-4 transition-colors duration-300 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho dark:text-primaryLight dark:hover:text-primaryho"
        >
          Request a quote
          <FaChevronRight
            aria-hidden
            className="h-2.5 w-2.5 transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </GlassCard>
  );
};

export default SingleCatalogItem;
