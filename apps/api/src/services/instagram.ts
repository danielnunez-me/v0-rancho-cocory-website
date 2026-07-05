import type { InstagramPost } from "@rancho-cocory/shared"
import { getCached, getCacheMeta, isCacheFresh, setCache } from "../lib/cache"

const CACHE_KEY = "instagram_feed"
const TTL_MS = 60 * 60 * 1000

interface InstagramApiMedia {
  id: string
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
  media_url?: string
  thumbnail_url?: string
  permalink: string
  caption?: string
  like_count?: number
  comments_count?: number
}

interface InstagramApiResponse {
  data: InstagramApiMedia[]
}

export async function fetchInstagramFeed(
  limit = 6,
): Promise<{ posts: InstagramPost[]; source: "api" | "cache" | "empty" }> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  const userId = process.env.INSTAGRAM_USER_ID

  const cached = await getCached<InstagramPost[]>(CACHE_KEY)
  const meta = await getCacheMeta(CACHE_KEY)

  if (meta && isCacheFresh(meta.fetchedAt, TTL_MS) && cached) {
    return { posts: cached.slice(0, limit), source: "cache" }
  }

  if (!token || !userId) {
    return { posts: cached?.slice(0, limit) ?? [], source: cached ? "cache" : "empty" }
  }

  try {
    const fields =
      "id,media_type,media_url,thumbnail_url,permalink,caption,like_count,comments_count"
    const url = `https://graph.instagram.com/${userId}/media?fields=${fields}&limit=${limit}&access_token=${token}`
    const res = await fetch(url)

    if (!res.ok) {
      throw new Error(`Instagram API error: ${res.status}`)
    }

    const json = (await res.json()) as InstagramApiResponse
    const posts: InstagramPost[] = json.data
      .filter((item) => item.media_url || item.thumbnail_url)
      .map((item) => ({
        id: item.id,
        mediaType: item.media_type,
        mediaUrl: item.media_url ?? item.thumbnail_url ?? "",
        thumbnailUrl: item.thumbnail_url,
        permalink: item.permalink,
        caption: item.caption,
        likes: item.like_count ?? 0,
        comments: item.comments_count ?? 0,
      }))

    await setCache(CACHE_KEY, posts)
    return { posts, source: "api" }
  } catch (error) {
    console.error("Instagram fetch failed:", error)
    if (cached) {
      return { posts: cached.slice(0, limit), source: "cache" }
    }
    return { posts: [], source: "empty" }
  }
}
