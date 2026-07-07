import { Timestamp } from "firebase-admin/firestore"
import { getDb } from "./firebase"

const CACHE_COLLECTION = "externalCache"

export async function getCached<T>(key: string): Promise<T | null> {
  const snapshot = await getDb().collection(CACHE_COLLECTION).doc(key).get()
  if (!snapshot.exists) return null

  const payload = snapshot.data()?.payload
  if (typeof payload === "string") {
    return JSON.parse(payload) as T
  }

  return payload as T
}

export async function setCache(key: string, payload: unknown): Promise<void> {
  await getDb()
    .collection(CACHE_COLLECTION)
    .doc(key)
    .set({
      payload: JSON.stringify(payload),
      fetchedAt: Timestamp.now(),
    })
}

export function isCacheFresh(fetchedAt: Date, ttlMs: number): boolean {
  return Date.now() - fetchedAt.getTime() < ttlMs
}

export async function getCacheMeta(key: string) {
  const snapshot = await getDb().collection(CACHE_COLLECTION).doc(key).get()
  if (!snapshot.exists) return null

  const data = snapshot.data()
  if (!data?.fetchedAt) return null

  return {
    key,
    payload: data.payload as string,
    fetchedAt: (data.fetchedAt as Timestamp).toDate(),
  }
}
