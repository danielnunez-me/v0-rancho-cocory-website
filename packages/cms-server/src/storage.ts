import { getStorage } from "firebase-admin/storage"
import { getFirebaseApp } from "./firebase"

function getBucket() {
  return getStorage(getFirebaseApp()).bucket()
}

export async function uploadMedia(
  buffer: Buffer,
  filename: string,
  contentType: string,
): Promise<string> {
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_")
  const path = `cms-media/${Date.now()}-${safeName}`
  const bucket = getBucket()
  const file = bucket.file(path)

  await file.save(buffer, {
    metadata: { contentType },
    public: true,
  })

  return `https://storage.googleapis.com/${bucket.name}/${path}`
}

export async function deleteMediaFromUrl(url: string): Promise<void> {
  const bucket = getBucket()
  const prefix = `https://storage.googleapis.com/${bucket.name}/`
  if (!url.startsWith(prefix)) {
    return
  }

  const path = url.slice(prefix.length)
  await bucket.file(path).delete({ ignoreNotFound: true })
}
