import type { Product, ProductInput } from "~/types";
import { getPrisma } from "~/server/utils/prisma";
import { promises as fs } from "node:fs";
import { dirname, join } from "node:path";
import { randomUUID } from "node:crypto";

const dataFile = join(process.cwd(), "server", "data", "products.json");

const mapDateProduct = (item: any): Product => ({
  ...item,
  description: item.description || item.note || "",
  createdAt: item.createdAt instanceof Date ? item.createdAt.toISOString() : item.createdAt,
  updatedAt: item.updatedAt instanceof Date ? item.updatedAt.toISOString() : item.updatedAt,
});

async function ensureDataFile() {
  await fs.mkdir(dirname(dataFile), { recursive: true });
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify([], null, 2), "utf-8");
  }
}

async function listProductsFromFile() {
  await ensureDataFile();
  const raw = await fs.readFile(dataFile, "utf-8");
  const parsed = JSON.parse(raw) as Product[];
  return parsed
    .map((item) => ({ ...item, description: item.description || item.note || "" }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

async function createProductInFile(input: ProductInput) {
  const products = await listProductsFromFile();
  const now = new Date().toISOString();
  const product: Product = {
    id: randomUUID(),
    ...input,
    createdAt: now,
    updatedAt: now,
  };
  products.push(product);
  await fs.writeFile(dataFile, JSON.stringify(products, null, 2), "utf-8");
  return product;
}

async function updateProductInFile(id: string, patch: Partial<ProductInput>) {
  const products = await listProductsFromFile();
  const index = products.findIndex((item) => item.id === id);
  if (index < 0) {
    throw createError({ statusCode: 404, statusMessage: "Product not found" });
  }
  const next: Product = {
    ...products[index],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  products[index] = next;
  await fs.writeFile(dataFile, JSON.stringify(products, null, 2), "utf-8");
  return next;
}

async function deleteProductInFile(id: string) {
  const products = await listProductsFromFile();
  const next = products.filter((item) => item.id !== id);
  if (next.length === products.length) {
    throw createError({ statusCode: 404, statusMessage: "Product not found" });
  }
  await fs.writeFile(dataFile, JSON.stringify(next, null, 2), "utf-8");
}

export async function listProducts() {
  try {
    const prisma = await getPrisma();
    const items = await prisma.product.findMany({
      orderBy: { name: "asc" },
    });
    return items.map(mapDateProduct);
  } catch {
    return listProductsFromFile();
  }
}

export async function createProduct(input: ProductInput) {
  try {
    const prisma = await getPrisma();
    const created = await prisma.product.create({
      data: {
        name: input.name,
        price: input.price,
        image: input.image,
        note: input.note,
        description: input.description,
        size: input.size,
        category: input.category,
        badge: input.badge || null,
        inStock: input.inStock,
      },
    });
    return mapDateProduct(created);
  } catch {
    return createProductInFile(input);
  }
}

export async function updateProduct(id: string, patch: Partial<ProductInput>) {
  try {
    const prisma = await getPrisma();
    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...patch,
        description: patch.description,
        badge: patch.badge === undefined ? undefined : patch.badge || null,
      },
    });
    return mapDateProduct(updated);
  } catch {
    return updateProductInFile(id, patch);
  }
}

export async function deleteProduct(id: string) {
  const prisma = await getPrisma();
  try {
    await prisma.product.delete({ where: { id } });
  } catch {
    await deleteProductInFile(id);
  }
}
