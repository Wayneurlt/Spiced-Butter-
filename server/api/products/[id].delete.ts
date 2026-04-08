import { deleteProduct } from "~/server/utils/products";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Missing product id" });
  }
  await deleteProduct(id);
  return { ok: true };
});
