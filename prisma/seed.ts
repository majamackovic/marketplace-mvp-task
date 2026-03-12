/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PrismaClient } from '../node_modules/.prisma/client/index.js';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Čišćenje baze (opciono, da ne dupliraš podatke svaki put)
  await prisma.ad.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // 2. Kreiranje kategorija
  const categories = [
    { name: 'Automobili', slug: 'automobili' },
    { name: 'Nekretnine', slug: 'nekretnine' },
    { name: 'Elektronika', slug: 'elektronika' },
    { name: 'Građevinarstvo', slug: 'gradjevinarstvo' },
  ];

  for (const cat of categories) {
    await prisma.category.create({
      data: cat,
    });
  }

  const allCategories = await prisma.category.findMany();
  const elektronikaId = allCategories.find((c) => c.slug === 'elektronika')?.id;
  const autoId = allCategories.find((c) => c.slug === 'automobili')?.id;

  // 3. Kreiranje demo korisnika
  const user = await prisma.user.create({
    data: {
      email: 'maja@example.com',
      name: 'Maja Horvacki',
      password: 'hashed_password_123', // U pravoj aplikaciji ovde ide hash
    },
  });

  // 4. Kreiranje demo oglasa
  await prisma.ad.createMany({
    data: [
      {
        title: 'iPhone 15 Pro - Subotica',
        description: 'Odlično stanje, star 3 meseca, garancija.',
        price: 900,
        currency: 'EUR',
        location: 'Subotica',
        categoryId: elektronikaId!,
        authorId: user.id,
        images: ['https://placehold.co/600x400?text=iPhone'],
      },
      {
        title: 'Golf 7 1.6 TDI',
        description: 'Registrovan godinu dana, uradjen mali servis.',
        price: 11500,
        currency: 'EUR',
        location: 'Subotica',
        categoryId: autoId!,
        authorId: user.id,
        images: ['https://placehold.co/600x400?text=Golf7'],
      },
    ],
  });

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
