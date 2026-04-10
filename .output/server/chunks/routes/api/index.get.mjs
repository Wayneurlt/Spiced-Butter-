import { c as defineEventHandler, m as listProducts } from '../../_/nitro.mjs';
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

const index_get = defineEventHandler(async () => {
  const items = await listProducts();
  return { items };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
