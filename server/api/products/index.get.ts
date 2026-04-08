import { listProducts } from "~/server/utils/products";

export default defineEventHandler(async () => {
  const items = await listProducts();
  return { items };
});
