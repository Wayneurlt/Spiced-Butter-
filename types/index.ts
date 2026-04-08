type ProductCategory = "hot" | "sweet" | "tangy" | "savory";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  note: string;
  size: string;
  category: ProductCategory;
  badge?: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

type ProductInput = Omit<Product, "id" | "createdAt" | "updatedAt">;

export type { Product, ProductInput, ProductCategory };
