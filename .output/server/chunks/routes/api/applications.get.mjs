import { c as defineEventHandler, g as getQuery, e as getPrisma } from '../../_/nitro.mjs';
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

const applications_get = defineEventHandler(async (event) => {
  const q = getQuery(event);
  const gender = typeof q.gender === "string" ? q.gender : undefined;
  const search = typeof q.search === "string" ? q.search : undefined;
  const page = q.page ? Math.max(parseInt(String(q.page)), 1) : 1;
  const pageSize = q.pageSize ? Math.min(Math.max(parseInt(String(q.pageSize)), 1), 50) : 10;
  const prisma = await getPrisma();
  const where = {};
  if (gender) where.gender = gender;
  if (search) {
    where.OR = [
      { fullName: { contains: search, mode: "insensitive" } },
      { socialMedia: { contains: search, mode: "insensitive" } },
      { phoneNumber: { contains: search, mode: "insensitive" } }
    ];
  }
  const [total, items, female, male, other] = await Promise.all([
    prisma.application.count({ where }),
    prisma.application.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize
    }),
    prisma.application.count({ where: { ...where, gender: "female" } }),
    prisma.application.count({ where: { ...where, gender: "male" } }),
    prisma.application.count({ where: { ...where, gender: "other" } })
  ]);
  return {
    items,
    meta: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
      counts: { female, male, other }
    }
  };
});

export { applications_get as default };
//# sourceMappingURL=applications.get.mjs.map
