import { c as defineEventHandler, i as getRouterParams, e as getPrisma, h as createError } from '../../../_/nitro.mjs';
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

const _id__get = defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const prisma = await getPrisma();
  const item = await prisma.application.findUnique({ where: { id } });
  if (!item) {
    throw createError({ statusCode: 404, statusMessage: "Not found" });
  }
  return item;
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
