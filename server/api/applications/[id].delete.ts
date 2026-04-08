import { getPrisma } from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const cookie = getCookie(event, "admin_session_v1");
  if (cookie !== "ok") {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  const { id } = getRouterParams(event);
  const prisma = await getPrisma(event);
  await prisma.application.delete({ where: { id } });
  return { ok: true };
});


