import { Hono } from "hono"
import { fetchGoogleReviews } from "@rancho-cocory/cms-server"

export const googleReviewsRoutes = new Hono()

googleReviewsRoutes.get("/reviews", async (c) => {
  const { data, source } = await fetchGoogleReviews()
  return c.json({
    ...(data ?? {
      rating: 0,
      userRatingCount: 0,
      displayName: "",
      reviews: [],
    }),
    source,
  })
})
