import "dotenv/config"
import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { authRoutes } from "./routes/auth"
import { contentRoutes } from "./routes/content"
import { instagramRoutes } from "./routes/instagram"
import { googleReviewsRoutes } from "./routes/google-reviews"

const app = new Hono()

const frontendOrigin =
  process.env.FRONTEND_ORIGIN ?? "http://localhost:3000"

app.use(
  "*",
  cors({
    origin: frontendOrigin,
    credentials: true,
  }),
)

app.get("/health", (c) => c.json({ ok: true }))

app.route("/content", contentRoutes)
app.route("/auth", authRoutes)
app.route("/instagram", instagramRoutes)
app.route("/google", googleReviewsRoutes)

const port = Number(process.env.PORT ?? 3001)

console.log(`API server running on http://localhost:${port}`)

serve({ fetch: app.fetch, port })
