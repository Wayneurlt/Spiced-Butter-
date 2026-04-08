import type { H3Event } from "h3";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

let prismaSingleton: PrismaClient | null = globalForPrisma.prisma ?? null;

export async function getPrisma(_event?: H3Event) {
  if (prismaSingleton) return prismaSingleton;

  prismaSingleton = new PrismaClient();
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prismaSingleton;
  }

  return prismaSingleton;
}


