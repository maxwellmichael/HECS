export interface CatalogItem {
  name: string;
  summary: string;
}

export type SubcategoryKey =
  | "mechanical"
  | "electrical"
  | "electronics_control"
  | "instrumentation";

export type CatalogSubcategories = Record<SubcategoryKey, CatalogItem[]>;

export interface CatalogProduct {
  id: string;
  name: string;
  source_title: string;
  summary: string;
  subcategories: CatalogSubcategories;
  item_count: number;
  subcategory_count: number;
}

export interface CatalogSummary {
  product_categories: number;
  total_listed_items: number;
  subcategories: string[];
}

export interface ProductsCatalog {
  products: CatalogProduct[];
  summary: CatalogSummary;
}

export interface CatalogItemWithGroup extends CatalogItem {
  group: SubcategoryKey;
}