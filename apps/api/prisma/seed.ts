import { PrismaClient } from "@prisma/client"
import {
  defaultPageContent,
  pageContentSchema,
} from "@rancho-cocory/shared"

const prisma = new PrismaClient()

async function main() {
  const data = JSON.stringify(defaultPageContent)
  await prisma.pageContent.upsert({
    where: { id: "main" },
    update: { data },
    create: { id: "main", data },
  })
  console.log("Seeded page content")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
