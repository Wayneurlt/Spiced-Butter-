import { c as defineEventHandler, j as getRouterParam, h as createError, r as readBody, l as updateProduct } from '../../../_/nitro.mjs';
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

const _id__put = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Missing product id" });
  }
  const body = await readBody(event);
  if (body.price !== undefined && (typeof body.price !== "number" || Number.isNaN(body.price) || body.price < 0)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid price value" });
  }
  const next = await updateProduct(id, {
    name: (_a = body.name) == null ? undefined : _a.trim(),
    image: (_b = body.image) == null ? undefined : _b.trim(),
    note: (_c = body.note) == null ? undefined : _c.trim(),
    description: (_d = body.description) == null ? undefined : _d.trim(),
    size: (_e = body.size) == null ? undefined : _e.trim(),
    category: body.category,
    badge: (_f = body.badge) == null ? undefined : _f.trim(),
    inStock: body.inStock,
    price: body.price
  });
  return { item: next };
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
