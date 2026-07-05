import { randomBytes } from "node:crypto"
import bcrypt from "bcryptjs"
import { prisma } from "./prisma"

const SESSION_COOKIE = "cms_session"
const SESSION_HOURS = 8

export { SESSION_COOKIE }

export function getAdminPasswordHash(): string {
  const password = process.env.ADMIN_PASSWORD ?? "admin123"
  if (password.startsWith("$2")) {
    return password
  }
  return bcrypt.hashSync(password, 10)
}

export async function verifyPassword(password: string): Promise<boolean> {
  const envPassword = process.env.ADMIN_PASSWORD ?? "admin123"
  if (envPassword.startsWith("$2")) {
    return bcrypt.compare(password, envPassword)
  }
  return password === envPassword
}

export async function createSession(): Promise<string> {
  const token = randomBytes(32).toString("hex")
  const expiresAt = new Date(Date.now() + SESSION_HOURS * 60 * 60 * 1000)

  await prisma.adminSession.create({
    data: { token, expiresAt },
  })

  return token
}

export async function validateSession(
  token: string | undefined,
): Promise<boolean> {
  if (!token) return false

  const session = await prisma.adminSession.findUnique({ where: { token } })
  if (!session) return false

  if (session.expiresAt < new Date()) {
    await prisma.adminSession.delete({ where: { token } })
    return false
  }

  return true
}

export async function deleteSession(token: string): Promise<void> {
  await prisma.adminSession.deleteMany({ where: { token } })
}

export function isValidEditKey(editKey: string | undefined): boolean {
  const expected = process.env.EDIT_KEY ?? "dev-edit-key"
  return !!editKey && editKey === expected
}

export const SESSION_MAX_AGE_SECONDS = SESSION_HOURS * 60 * 60
