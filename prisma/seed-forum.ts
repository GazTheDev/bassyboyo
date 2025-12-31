import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const categories = [
    { title: "General Discussion", description: "Chat about FM26 news, features, and real life football.", slug: "general", order: 1 },
    { title: "Tactics & Training", description: "Share your knap-beaters and ask for tactical advice.", slug: "tactics", order: 2 },
    { title: "Mod Support", description: "Having trouble installing a pack? Ask here.", slug: "support", order: 3 },
    { title: "Career Stories", description: "Share your journey from the Vanarama to the Champions League.", slug: "stories", order: 4 },
  ]

  for (const cat of categories) {
    await prisma.forumCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }
  console.log("Forum Categories Created!")
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })