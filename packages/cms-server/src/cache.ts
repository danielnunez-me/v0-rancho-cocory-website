import { prisma } from "./prisma"

export async function getCached<T>(key: string): Promise<T | null> {
  const record = await prisma.externalCache.findUnique({ where: { key } })
  if (!record) return null
  return JSON.parse(record.payload) as T
}

export async function setCache(key: string, payload: unknown): Promise<void> {
  await prisma.externalCache.upsert({
    where: { key },
    update: { payload: JSON.stringify(payload), fetchedAt: new Date() },
    create: { key, payload: JSON.stringify(payload) },
  })
}

export function isCacheFresh(fetchedAt: Date, ttlMs: number): boolean {
  return Date.now() - fetchedAt.getTime() < ttlMs
}

export async function getCacheMeta(key: string) {
  return prisma.externalCache.findUnique({ where: { key } })
}
