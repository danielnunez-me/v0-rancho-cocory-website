import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { contentPatchSchema } from "@rancho-cocory/shared"
import {
  getPageContent,
  SESSION_COOKIE,
  updatePageContent,
  validateSession,
} from "@rancho-cocory/cms-server"

export async function GET() {
  try {
    const content = await getPageContent()
    return NextResponse.json(content)
  } catch (error) {
    console.error("Failed to load page content:", error)
    return NextResponse.json({ error: "Content not found" }, { status: 404 })
  }
}

export async function PATCH(request: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  const isAuthed = await validateSession(token)

  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const parsed = contentPatchSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid patch", details: parsed.error.flatten() },
      { status: 400 },
    )
  }

  try {
    const content = await updatePageContent(parsed.data.path, parsed.data.value)
    return NextResponse.json(content)
  } catch (error) {
    console.error("Failed to update page content:", error)
    return NextResponse.json({ error: "Update failed" }, { status: 500 })
  }
}
