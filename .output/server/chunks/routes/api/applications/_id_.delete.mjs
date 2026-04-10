import { c as defineEventHandler, f as getCookie, h as createError, i as getRouterParams, e as getPrisma } from '../../../_/nitro.mjs';
import '@prisma/client';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:url';
import '@iconify/utils';
import 'consola/core';
import 'node:module';

const _id__delete = defineEventHandler(async (event) => {
  const cookie = getCookie(event, "admin_session_v1");
  if (cookie !== "ok") {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  const { id } = getRouterParams(event);
  const prisma = await getPrisma();
  await prisma.application.delete({ where: { id } });
  return { ok: true };
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
