"use client"

import { useEffect, useState } from "react"
import type { InstagramPost } from "@rancho-cocory/shared"
import { getInstagramFeed } from "@/lib/cms-client"

export function useInstagramFeed(limit = 6) {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [source, setSource] = useState<string>("empty")

  useEffect(() => {
    let cancelled = false

    async function load() {
      setIsLoading(true)
      try {
        const data = await getInstagramFeed(limit)
        if (!cancelled) {
          setPosts(data.posts)
          setSource(data.source)
        }
      } catch {
        if (!cancelled) {
          setPosts([])
          setSource("error")
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [limit])

  return { posts, isLoading, source }
}
