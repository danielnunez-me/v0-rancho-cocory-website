import {
  pageContentSchema,
  type PageContent,
} from "@rancho-cocory/shared"
import { prisma } from "./prisma"

export async function getPageContent(): Promise<PageContent> {
  const record = await prisma.pageContent.findUnique({ where: { id: "main" } })
  if (!record) {
    throw new Error("Page content not found")
  }
  return pageContentSchema.parse(JSON.parse(record.data))
}

export async function updatePageContent(
  path: string,
  value: unknown,
): Promise<PageContent> {
  const current = await getPageContent()
  const updated = setByPath(current, path.split("."), value)
  const parsed = pageContentSchema.parse(updated)

  await prisma.pageContent.update({
    where: { id: "main" },
    data: { data: JSON.stringify(parsed) },
  })

  return parsed
}

function setByPath(obj: unknown, keys: string[], value: unknown): unknown {
  if (keys.length === 0) return value

  const [head, ...rest] = keys

  if (rest.length === 0) {
    if (Array.isArray(obj)) {
      const index = Number(head)
      if (Number.isNaN(index)) return obj
      const copy = [...obj]
      copy[index] = value
      return copy
    }
    if (typeof obj === "object" && obj !== null) {
      return { ...(obj as Record<string, unknown>), [head]: value }
    }
    return obj
  }

  if (Array.isArray(obj)) {
    const index = Number(head)
    if (Number.isNaN(index)) return obj
    const copy = [...obj]
    copy[index] = setByPath(copy[index], rest, value)
    return copy
  }

  if (typeof obj === "object" && obj !== null) {
    const record = obj as Record<string, unknown>
    return {
      ...record,
      [head]: setByPath(record[head], rest, value),
    }
  }

  return obj
}
