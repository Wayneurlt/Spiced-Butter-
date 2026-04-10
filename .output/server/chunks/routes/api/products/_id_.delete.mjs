import { c as defineEventHandler, j as getRouterParam, h as createError, k as deleteProduct } from '../../../_/nitro.mjs';
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
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Missing product id" });
  }
  await deleteProduct(id);
  return { ok: true };
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
