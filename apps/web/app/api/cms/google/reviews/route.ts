import { NextResponse } from "next/server"
import { fetchGoogleReviews } from "@rancho-cocory/cms-server"

export async function GET() {
  const { data, source } = await fetchGoogleReviews()
  return NextResponse.json({
    ...(data ?? {
      rating: 0,
      userRatingCount: 0,
      displayName: "",
      reviews: [],
    }),
    source,
  })
}
