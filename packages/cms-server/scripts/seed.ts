import { defaultPageContent } from "@rancho-cocory/shared"
import { seedPageContent } from "../src/content"

async function main() {
  await seedPageContent(defaultPageContent)
  console.log("Seeded page content to Firestore")
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
