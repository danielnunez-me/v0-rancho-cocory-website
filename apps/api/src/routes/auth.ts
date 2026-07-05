import { Hono } from "hono"
import { setCookie, deleteCookie, getCookie } from "hono/cookie"
import {
  createSession,
  deleteSession,
  isValidEditKey,
  SESSION_COOKIE,
  validateSession,
  verifyPassword,
} from "../lib/auth"

export const authRoutes = new Hono()

authRoutes.post("/login", async (c) => {
  const body = await c.req.json<{ password?: string; editKey?: string }>()
  const editKey =
    body.editKey ??
    c.req.header("x-edit-key") ??
    c.req.query("edit_key")

  if (!isValidEditKey(editKey)) {
    return c.json({ error: "Invalid edit key" }, 403)
  }

  if (!body.password || !(await verifyPassword(body.password))) {
    return c.json({ error: "Invalid password" }, 401)
  }

  const token = await createSession()
  setCookie(c, SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    path: "/",
    maxAge: 8 * 60 * 60,
  })

  return c.json({ ok: true })
})

authRoutes.post("/logout", async (c) => {
  const token = getCookie(c, SESSION_COOKIE)
  if (token) {
    await deleteSession(token)
  }
  deleteCookie(c, SESSION_COOKIE, { path: "/" })
  return c.json({ ok: true })
})

authRoutes.get("/me", async (c) => {
  const editKey = c.req.query("edit_key") ?? c.req.header("x-edit-key")
  const token = getCookie(c, SESSION_COOKIE)
  const hasValidKey = isValidEditKey(editKey)
  const isAuthed = await validateSession(token)

  return c.json({
    hasValidEditKey: hasValidKey,
    isAuthenticated: isAuthed,
    canEdit: hasValidKey && isAuthed,
  })
})
