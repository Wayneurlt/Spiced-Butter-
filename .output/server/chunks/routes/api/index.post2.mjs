import { c as defineEventHandler, r as readBody, h as createError, n as createProduct } from '../../_/nitro.mjs';
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

const index_post = defineEventHandler(async (event) => {
  var _a, _b;
  const body = await readBody(event);
  if (!(body == null ? undefined : body.name) || !(body == null ? undefined : body.image) || !(body == null ? undefined : body.note) || !(body == null ? undefined : body.description) || !(body == null ? undefined : body.size) || !(body == null ? undefined : body.category)) {
    throw createError({ statusCode: 400, statusMessage: "Missing required fields" });
  }
  if (typeof body.price !== "number" || Number.isNaN(body.price) || body.price < 0) {
    throw createError({ statusCode: 400, statusMessage: "Invalid price value" });
  }
  const product = await createProduct({
    name: body.name.trim(),
    image: body.image.trim(),
    note: body.note.trim(),
    description: body.description.trim(),
    size: body.size.trim(),
    category: body.category,
    badge: ((_a = body.badge) == null ? undefined : _a.trim()) || undefined,
    inStock: (_b = body.inStock) != null ? _b : true,
    price: body.price
  });
  return { item: product };
});

export { index_post as default };
//# sourceMappingURL=index.post2.mjs.map
