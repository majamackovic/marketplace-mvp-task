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

  // 1. Čišćenje baze
  await prisma.ad.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // 2. Kreiranje 15 kategorija
  const categoryData = [
    { name: 'Automobili', slug: 'automobili' },
    { name: 'Nekretnine', slug: 'nekretnine' },
    { name: 'Elektronika', slug: 'elektronika' },
    { name: 'Građevinarstvo', slug: 'gradjevinarstvo' },
    { name: 'Nameštaj', slug: 'namestaj' },
    { name: 'Usluge', slug: 'usluge' },
    { name: 'Poljoprivreda', slug: 'poljoprivreda' },
    { name: 'Kućni ljubimci', slug: 'kucni-ljubimci' },
    { name: 'Sport i rekreacija', slug: 'sport-i-rekreacija' },
    { name: 'Odeća i obuća', slug: 'odeca-i-obuca' },
    { name: 'Kolekcionarstvo', slug: 'kolekcionarstvo' },
    { name: 'Alati i oruđa', slug: 'alati-i-orudja' },
    { name: 'Knjige', slug: 'knjige' },
    { name: 'Muzički instrumenti', slug: 'muzicki-instrumenti' },
    { name: 'Bela tehnika', slug: 'bela-tehnika' },
  ];

  for (const cat of categoryData) {
    await prisma.category.create({ data: cat });
  }

  const allCats = await prisma.category.findMany();
  const getCatId = (slug: string) => allCats.find((c) => c.slug === slug)?.id;

  // 3. Kreiranje 2 demo korisnika
  // Lozinka je "password123" - u realnom app-u bi išao bcrypt hash
  const user1 = await prisma.user.create({
    data: {
      email: 'maja@example.com',
      name: 'Maja Horvacki',
      phone: '0641234567',
      password: 'hashed_password_123', 
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'marko@example.com',
      name: 'Marko Električar',
      phone: '0659876543',
      password: 'hashed_password_123',
    },
  });

  // 4. Kreiranje 20 oglasa
  const ads = [
    // Elektronika (Maja)
    { title: 'iPhone 15 Pro', description: 'Kao nov, Subotica.', price: 950, cat: 'elektronika', user: user1.id },
    { title: 'MacBook Air M2', description: '8GB RAM, 256GB SSD.', price: 1100, cat: 'elektronika', user: user1.id },
    { title: 'PlayStation 5', description: 'Dva džojstika, 3 igre.', price: 450, cat: 'elektronika', user: user2.id },
    
    // Automobili (Marko)
    { title: 'Golf 7 1.6 TDI', description: 'Odličan auto, registrovan.', price: 11200, cat: 'automobili', user: user2.id },
    { title: 'Audi A3 Sportback', description: 'S-line oprema, 2018 god.', price: 18500, cat: 'automobili', user: user2.id },
    { title: 'Fiat Punto', description: 'Idealan za početnike.', price: 1500, cat: 'automobili', user: user1.id },

    // Nekretnine
    { title: 'Dvosoban stan, Prozivka', description: 'Renoviran, 55m2.', price: 65000, cat: 'nekretnine', user: user1.id },
    { title: 'Kuća na Paliću', description: 'Blizu jezera, velika bašta.', price: 120000, cat: 'nekretnine', user: user2.id },

    // Alati (Marko ekspert)
    { title: 'Makita Bušilica', description: 'Profesionalni alat, malo korišćeno.', price: 120, cat: 'alati-i-orudja', user: user2.id },
    { title: 'Set šrafcigera', description: 'Nemački kvalitet.', price: 30, cat: 'alati-i-orudja', user: user2.id },

    // Poljoprivreda
    { title: 'Sadnice lavande', description: 'Spremne za sadnju.', price: 5, cat: 'poljoprivreda', user: user1.id },
    { title: 'Traktor IMT 539', description: 'U dobrom stanju.', price: 3500, cat: 'poljoprivreda', user: user2.id },

    // Nameštaj
    { title: 'Ugaona garnitura', description: 'Siva boja, razvlači se.', price: 400, cat: 'namestaj', user: user1.id },
    { title: 'Trpezarijski sto', description: 'Hrastovo drvo, masivan.', price: 250, cat: 'namestaj', user: user1.id },

    // Razno
    { title: 'Zlatni retriver štenci', description: 'Vakcinisani, sa papirima.', price: 200, cat: 'kucni-ljubimci', user: user1.id },
    { title: 'Gitara Fender Stratocaster', description: 'Made in Mexico.', price: 600, cat: 'muzicki-instrumenti', user: user2.id },
    { title: 'Bicikl Giant', description: 'MTB, 29 točkovi.', price: 350, cat: 'sport-i-rekreacija', user: user1.id },
    { title: 'Veš mašina LG', description: 'DirectDrive, 7kg.', price: 280, cat: 'bela-tehnika', user: user2.id },
    { title: 'Enciklopedija prirode', description: 'Tvrdi povez, novo.', price: 20, cat: 'knjige', user: user1.id },
    { title: 'Betonska mešalica', description: 'Ispravna, spremna za rad.', price: 150, cat: 'gradjevinarstvo', user: user2.id },
  ];

  for (const ad of ads) {
    await prisma.ad.create({
      data: {
        title: ad.title,
        description: ad.description,
        price: ad.price,
        currency: 'EUR',
        location: 'Subotica',
        categoryId: getCatId(ad.cat)!,
        authorId: ad.user,
        images: [`https://placehold.co/600x400?text=${ad.title.replace(/\s+/g, '+')}`],
      },
    });
  }

  console.log('✅ Seeding complete! 20 ads created across multiple categories.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });