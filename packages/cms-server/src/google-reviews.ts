import type { GoogleReviewsResponse } from "@rancho-cocory/shared"
import { getCached, getCacheMeta, isCacheFresh, setCache } from "./cache"

const CACHE_KEY = "google_reviews"
const TTL_MS = 6 * 60 * 60 * 1000

interface GoogleReviewRaw {
  name?: string
  rating?: number
  text?: { text?: string }
  relativePublishTimeDescription?: string
  authorAttribution?: {
    displayName?: string
    photoUri?: string
  }
}

interface GooglePlaceResponse {
  displayName?: { text?: string }
  rating?: number
  userRatingCount?: number
  reviews?: GoogleReviewRaw[]
}

export async function fetchGoogleReviews(): Promise<{
  data: GoogleReviewsResponse | null
  source: "api" | "cache" | "empty"
}> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId =
    process.env.GOOGLE_PLACE_ID ?? "ChIJ6eHmZkhIqowRNY9WuTsX2289"

  const cached = await getCached<GoogleReviewsResponse>(CACHE_KEY)
  const meta = await getCacheMeta(CACHE_KEY)

  if (meta && isCacheFresh(meta.fetchedAt, TTL_MS) && cached) {
    return { data: cached, source: "cache" }
  }

  if (!apiKey) {
    return { data: cached, source: cached ? "cache" : "empty" }
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${placeId}`
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews",
      },
    })

    if (!res.ok) {
      throw new Error(`Google Places API error: ${res.status}`)
    }

    const json = (await res.json()) as GooglePlaceResponse
    const data: GoogleReviewsResponse = {
      displayName: json.displayName?.text ?? "Rancho Cocory",
      rating: json.rating ?? 0,
      userRatingCount: json.userRatingCount ?? 0,
      reviews: (json.reviews ?? []).map((review, index) => ({
        id: review.name ?? `review-${index}`,
        authorName: review.authorAttribution?.displayName ?? "Visitante",
        rating: review.rating ?? 5,
        text: review.text?.text ?? "",
        relativeTime: review.relativePublishTimeDescription ?? "",
        profilePhotoUrl: review.authorAttribution?.photoUri,
      })),
    }

    await setCache(CACHE_KEY, data)
    return { data, source: "api" }
  } catch (error) {
    console.error("Google Reviews fetch failed:", error)
    if (cached) {
      return { data: cached, source: "cache" }
    }
    return { data: null, source: "empty" }
  }
}
