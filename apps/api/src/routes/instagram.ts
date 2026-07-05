import { Hono } from "hono"
import { fetchInstagramFeed } from "../services/instagram"

export const instagramRoutes = new Hono()

instagramRoutes.get("/feed", async (c) => {
  const limit = Number(c.req.query("limit") ?? "6")
  const { posts, source } = await fetchInstagramFeed(limit)
  return c.json({ posts, source })
})
