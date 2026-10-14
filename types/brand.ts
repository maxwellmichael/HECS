export type Product = {
  name: string;
  imagePath: string;
};

export type Brand = {
  id: number;
  name: string;
  logoImagepath?: string;
  products: Product[];
};