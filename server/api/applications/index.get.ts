import { getPrisma } from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  // Filters & pagination
  const q = getQuery(event);
  const gender = typeof q.gender === 'string' ? q.gender : undefined;
  const search = typeof q.search === 'string' ? q.search : undefined;
  const page = q.page ? Math.max(parseInt(String(q.page)), 1) : 1;
  const pageSize = q.pageSize ? Math.min(Math.max(parseInt(String(q.pageSize)), 1), 50) : 10;

  const prisma = await getPrisma(event);
  const where: any = {};
  if (gender) where.gender = gender;
  if (search) {
    where.OR = [
      { fullName: { contains: search, mode: 'insensitive' } },
      { socialMedia: { contains: search, mode: 'insensitive' } },
      { phoneNumber: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [total, items, female, male, other] = await Promise.all([
    prisma.application.count({ where }),
    prisma.application.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.application.count({ where: { ...where, gender: 'female' } }),
    prisma.application.count({ where: { ...where, gender: 'male' } }),
    prisma.application.count({ where: { ...where, gender: 'other' } }),
  ]);

  return {
    items,
    meta: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
      counts: { female, male, other },
    },
  };
});


