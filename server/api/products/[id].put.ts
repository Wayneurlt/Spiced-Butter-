import type { ProductInput } from "~/types";
import { updateProduct } from "~/server/utils/products";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Missing product id" });
  }

  const body = await readBody<Partial<ProductInput>>(event);

  if (body.price !== undefined && (typeof body.price !== "number" || Number.isNaN(body.price) || body.price < 0)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid price value" });
  }

  const next = await updateProduct(id, {
    name: body.name?.trim(),
    image: body.image?.trim(),
    note: body.note?.trim(),
    size: body.size?.trim(),
    category: body.category,
    badge: body.badge?.trim(),
    inStock: body.inStock,
    price: body.price,
  });

  return { item: next };
});
