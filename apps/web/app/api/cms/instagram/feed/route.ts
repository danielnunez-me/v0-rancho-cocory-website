import { NextResponse } from "next/server"
import { fetchInstagramFeed } from "@rancho-cocory/cms-server"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const limit = Number(url.searchParams.get("limit") ?? "6")
  const { posts, source } = await fetchInstagramFeed(limit)
  return NextResponse.json({ posts, source })
}
