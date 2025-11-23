// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 1. Clear existing data so we don't get duplicates if we run this twice
  await prisma.download.deleteMany()
  await prisma.article.deleteMany()

  console.log('🌱 Starting seeding...')

  // 2. Create Fake Downloads
  await prisma.download.create({
    data: {
      title: 'Premier League Real Names Fix',
      description: 'Corrects the fake names for all Premier League clubs and competitions. Essential for immersion.',
      fileUrl: 'https://example.com/real-names.zip',
      category: 'Database',
      downloads: 1250,
    },
  })

  await prisma.download.create({
    data: {
      title: 'BassyBoy Wonderkids Shortlist 2025',
      description: 'A curated list of the best 50 wonderkids under £10m. Import directly into your game.',
      fileUrl: 'https://example.com/wonderkids.fmf',
      category: 'Shortlist',
      downloads: 890,
    },
  })

  await prisma.download.create({
    data: {
      title: 'Metallic Logos Megapack',
      description: 'Over 50,000 club and competition logos in a shiny metallic style.',
      fileUrl: 'https://example.com/logos.zip',
      category: 'Graphics',
      downloads: 5000,
    },
  })

  // 3. Create Fake Articles
  await prisma.article.create({
    data: {
      title: 'How to Scout in Lower Leagues',
      category: 'Tutorial',
      content: 'Scouting with no budget is hard. Here is how I find gems in the Vanarama North...',
    },
  })

  await prisma.article.create({
    data: {
      title: 'My BassyBoy FC Tactics Explained',
      category: 'Tactics',
      content: 'The 4-2-3-1 Gegenpress that got me promoted three times in a row.',
    },
  })

  console.log('✅ Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })