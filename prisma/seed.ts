import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function id() {
  return `${Date.now()}_${Math.random().toString(36).slice(2,10)}`;
}

const firstNames = ["Ava","Mia","Sophia","Isabella","Amelia","Olivia","Emma","Charlotte","Lily","Grace"];
const bios = [
  "Foodie, traveler, and book lover.",
  "Coffee-powered designer who loves sunsets.",
  "Gym, music, and cozy movie nights.",
  "Hiking on weekends, coding on weekdays.",
  "Baker of cupcakes and breaker of hearts.",
  "Pet mom and amateur photographer.",
  "Board games and brunch enthusiast.",
  "Sassy, classy, and a bit smart-assy.",
  "Beach walks and city lights explorer.",
  "Curious mind with a creative soul.",
];

async function main() {
  const apps = Array.from({ length: 10 }).map((_, i) => ({
    id: id(),
    fullName: `${firstNames[i]} Test` ,
    phoneNumber: `+1-202-555-01${(10 + i).toString().padStart(2,'0')}`,
    age: 21 + (i % 10),
    gender: i % 5 === 0 ? 'other' : 'female',
    bio: bios[i],
    interests: "Music, travel, food",
    bringsTable: "Loyalty, humor, honesty",
    idealDate: "Dinner and a walk",
    cookingSkills: 2 + (i % 4),
    communicate: i % 2 === 0 ? 'weekly' : 'monthly',
    bodyCount: i % 5,
    socialMedia: `tester_${i}`,
    petPreference: i % 3 === 0 ? 'dogs' : 'cats',
    communicationStyle: ['direct','emotional','reserved','playful'][i % 4],
    photoDataUrl: null,
  }));

  for (const a of apps) {
    await prisma.application.upsert({
      where: { id: a.id },
      update: {},
      create: a,
    });
  }

  console.log(`Seeded ${apps.length} applications`);
}

main().finally(async () => {
  await prisma.$disconnect();
});


