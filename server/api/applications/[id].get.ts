import { getPrisma } from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const prisma = await getPrisma(event);
  const item = await prisma.application.findUnique({ where: { id } });
  if (!item) {
    throw createError({ statusCode: 404, statusMessage: "Not found" });
  }
  return item;
});


