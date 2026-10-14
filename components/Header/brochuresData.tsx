export interface Brochure {
  id: number;
  title: string;
  fileName: string;
  fileUrl: string;
  previewImage: string;
}

export const brochures: Brochure[] = [
  {
    id: 1,
    title: "Product Catalog 1",
    fileName: "heliac-product-catalog-1.pdf",
    fileUrl: "/downloads/brochure.pdf",
    previewImage: "/images/brochures/brochure-1-preview.webp",
  },
  {
    id: 2,
    title: "Product Catalog 2",
    fileName: "heliac-product-catalog-2.pdf",
    fileUrl: "/downloads/brochure-2.pdf",
    previewImage: "/images/brochures/brochure-2-preview.webp",
  },
];

export const triggerDownload = (fileUrl: string, fileName: string) => {
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
