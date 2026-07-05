import { Hono } from "hono"
import { fetchGoogleReviews } from "../services/google-reviews"

export const googleReviewsRoutes = new Hono()

googleReviewsRoutes.get("/reviews", async (c) => {
  const { data, source } = await fetchGoogleReviews()
  return c.json({ ...(data ?? { rating: 0, userRatingCount: 0, displayName: "", reviews: [] }), source })
})
