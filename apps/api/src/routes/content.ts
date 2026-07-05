import { Hono } from "hono"
import { getCookie } from "hono/cookie"
import { contentPatchSchema } from "@rancho-cocory/shared"
import {
  getPageContent,
  updatePageContent,
  SESSION_COOKIE,
  validateSession,
} from "@rancho-cocory/cms-server"

export const contentRoutes = new Hono()

contentRoutes.get("/", async (c) => {
  const content = await getPageContent()
  return c.json(content)
})

contentRoutes.patch("/", async (c) => {
  const token = getCookie(c, SESSION_COOKIE)
  const isAuthed = await validateSession(token)
  if (!isAuthed) {
    return c.json({ error: "Unauthorized" }, 401)
  }

  const body = await c.req.json()
  const parsed = contentPatchSchema.safeParse(body)
  if (!parsed.success) {
    return c.json(
      { error: "Invalid patch", details: parsed.error.flatten() },
      400,
    )
  }

  const content = await updatePageContent(parsed.data.path, parsed.data.value)
  return c.json(content)
})
