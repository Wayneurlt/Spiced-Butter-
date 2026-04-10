import type { ProductInput } from "~/types";
import { createProduct } from "~/server/utils/products";

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<ProductInput>>(event);

  if (!body?.name || !body?.image || !body?.note || !body?.description || !body?.size || !body?.category) {
    throw createError({ statusCode: 400, statusMessage: "Missing required fields" });
  }
  if (typeof body.price !== "number" || Number.isNaN(body.price) || body.price < 0) {
    throw createError({ statusCode: 400, statusMessage: "Invalid price value" });
  }

  const product = await createProduct({
    name: body.name.trim(),
    image: body.image.trim(),
    note: body.note.trim(),
    description: body.description.trim(),
    size: body.size.trim(),
    category: body.category,
    badge: body.badge?.trim() || undefined,
    inStock: body.inStock ?? true,
    price: body.price,
  });

  return { item: product };
});
