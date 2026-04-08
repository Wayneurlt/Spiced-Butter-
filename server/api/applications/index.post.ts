import { getPrisma } from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {

  const body = await readBody(event);
  const required = [
    "fullName","phoneNumber","age","gender","bio","interests","communicate","communicationStyle"
  ];
  for (const k of required) {
    if (!body?.[k]) {
      throw createError({ statusCode: 400, statusMessage: `Missing field: ${k}` });
    }
  }
  if (Number(body.age) < 18) {
    throw createError({ statusCode: 400, statusMessage: "Must be at least 18" });
  }

  const prisma = await getPrisma(event);
  const id = body.id || `${Date.now()}_${Math.random().toString(36).slice(2,10)}`;

  const created = await prisma.application.create({
    data: {
      id,
      fullName: String(body.fullName),
      phoneNumber: String(body.phoneNumber),
      age: Number(body.age),
      gender: String(body.gender),
      bio: String(body.bio),
      interests: String(body.interests),
      bringsTable: body.table ? String(body.table) : null,
      idealDate: body.idealDate ? String(body.idealDate) : null,
      cookingSkills: body.cookingSkills ? Number(body.cookingSkills) : 3,
      communicate: String(body.communicate),
      bodyCount: body.bodyCount ? Number(body.bodyCount) : 0,
      socialMedia: body.socialMedia ? String(body.socialMedia) : null,
      petPreference: body.petPreference ? String(body.petPreference) : null,
      communicationStyle: String(body.communicationStyle),
      photoDataUrl: body.photoDataUrl ? String(body.photoDataUrl) : null,
    },
  });
  return { id: created.id };
});


