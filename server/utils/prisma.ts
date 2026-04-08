import type { H3Event } from "h3";

let prismaSingleton: any | null = null;

export async function getPrisma(_event?: H3Event) {
  if (prismaSingleton) return prismaSingleton;
  try {
    const mod = await import("@prisma/client");
    const { PrismaClient } = mod as any;
    prismaSingleton = new PrismaClient();
    return prismaSingleton;
  } catch (err) {
    throw createError({
      statusCode: 503,
      statusMessage: "Prisma Client not available. Ensure dependencies and database are configured.",
    });
  }
}


