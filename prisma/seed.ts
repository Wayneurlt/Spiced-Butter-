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

const products = [
  {
    id: "chili-oil",
    name: "Chili Oil",
    price: 250,
    note: "Bold heat with a smoky finish",
    size: "250g jar",
    category: "hot",
    badge: "Most Popular",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80",
    description: "Rich, aromatic oil infused with spices and hot chillies for a deep savory heat. Mix into your favourite stews and soups, fried or boiled eggs, kachumbari, noodles or stir-fried rice.",
    inStock: true,
  },
  {
    id: "ukwaju-dip",
    name: "Ukwaju Dip",
    price: 300,
    note: "Tangy tamarind depth for grilled meals",
    size: "250g jar",
    category: "tangy",
    image: "https://images.unsplash.com/photo-1609501676725-7186f7340f81?auto=format&fit=crop&w=900&q=80",
    description: "Tangy and spicy tamarind-based dip with a bold coastal profile. Use as a dip for viazi karai, bhajia, fries, samosas or nyama choma.",
    inStock: true,
  },
  {
    id: "mango-chutney",
    name: "Mango Chutney",
    price: 300,
    note: "Sweet-fruity balance with gentle spice",
    size: "250g jar",
    category: "sweet",
    badge: "Chef Pick",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=900&q=80",
    description: "A vibrant blend of sweet, tangy and spiced mango mush. Serve as a relish with chicken or pork choma, chapati, nyama choma or rice dishes.",
    inStock: true,
  },
  {
    id: "green-sauce",
    name: "Green Sauce",
    price: 250,
    note: "Herby and fresh with zesty brightness",
    size: "250g jar",
    category: "savory",
    image: "https://images.unsplash.com/photo-1529059997568-3d847b1154f0?auto=format&fit=crop&w=900&q=80",
    description: "Fresh, herb-based sauce with a spicy, zesty kick. Use as a marinade for pan-fried chicken, samaki wa kupaka or nyama choma, or dressing for wraps and sandwiches.",
    inStock: true,
  },
  {
    id: "pickled-onions",
    name: "Pickled Onions",
    price: 250,
    note: "Crunchy, sharp and naturally vibrant",
    size: "250g jar",
    category: "tangy",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=80",
    description: "Crisp, fresh red onions bathed in a tangy, lightly sweet brine. Add to your kachumbari, sandwiches or vegetable salad bowls.",
    inStock: true,
  },
  {
    id: "sweet-soy-glaze",
    name: "Sweet Soy Glaze",
    price: 350,
    note: "Rich umami glaze with sweet depth",
    size: "250g jar",
    category: "savory",
    badge: "New",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80",
    description: "Rich, sticky, savory glaze balancing sweetness and umami depth. Perfect for stir-frys (noodles, pork, chicken wings, veggies or drumsticks) and grilled meats.",
    inStock: true,
  },
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

  for (const p of products) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: {
        name: p.name,
        price: p.price,
        image: p.image,
        note: p.note,
        description: p.description,
        size: p.size,
        category: p.category,
        badge: p.badge || null,
        inStock: p.inStock,
      },
      create: p,
    });
  }

  console.log(`Seeded ${apps.length} applications and ${products.length} products`);
}

main().finally(async () => {
  await prisma.$disconnect();
});


