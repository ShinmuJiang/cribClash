import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleApartments = [
  {
    name: "Luxury Downtown Loft",
    description: "Modern loft with floor-to-ceiling windows and city views",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    address: "123 Main St, Downtown",
    price: 2500,
  },
  // ... (add more sample apartments as needed)
];

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.vote.deleteMany();
  await prisma.apartment.deleteMany();

  // Create apartments
  for (const apartment of sampleApartments) {
    await prisma.apartment.create({
      data: apartment,
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log(`Created ${sampleApartments.length} apartments`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });