export type Product = {
  name: string;
  imagePath: string;
};

export type Brand = {
  id: number;
  name: string;
  logoImagepath: string;
  products: Product[];
};

export type BrandLogo = {
  id: number;
  name: string;
  href: string;
  image: string;
  imageLight: string;
};