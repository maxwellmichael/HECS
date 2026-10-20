import rawCatalog from "@/data/products-catalog.json";
import {
  CatalogItemWithGroup,
  CatalogProduct,
  ProductsCatalog,
  SubcategoryKey,
} from "@/types/productCatalog";

/* The source JSON ships with trailing spaces in keys AND values
   ("products ", "name ", "Gas Turbine Parts ") — normalise once here. */
const trimDeep = (value: unknown): unknown => {
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value)) return value.map(trimDeep);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, val]) => [
        key.trim(),
        trimDeep(val),
      ]),
    );
  }
  return value;
};

export const productsCatalog = trimDeep(rawCatalog) as ProductsCatalog;
export const catalogProducts = productsCatalog.products;
export const catalogSummary = productsCatalog.summary;

export const SUBCATEGORY_ORDER: { key: SubcategoryKey; label: string }[] = [
  { key: "mechanical", label: "Mechanical" },
  { key: "electrical", label: "Electrical" },
  { key: "electronics_control", label: "Electronics & Control" },
  { key: "instrumentation", label: "Instrumentation" },
];

export const SUBCATEGORY_LABELS: Record<SubcategoryKey, string> = {
  mechanical: "Mechanical",
  electrical: "Electrical",
  electronics_control: "Electronics & Control",
  instrumentation: "Instrumentation",
};

export const getProductBySlug = (slug: string) =>
  catalogProducts.find((product) => product.id === slug);

export const getItems = (
  product: CatalogProduct,
  filter: SubcategoryKey | "all",
): CatalogItemWithGroup[] => {
  const keys =
    filter === "all"
      ? SUBCATEGORY_ORDER.map((s) => s.key)
      : ([filter] as SubcategoryKey[]);

  return keys.flatMap((key) =>
    (product.subcategories[key] ?? []).map((item) => ({
      ...item,
      group: key,
    })),
  );
};
