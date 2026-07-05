"use client"

import { useEffect, useState } from "react"
import type { GoogleReviewsResponse } from "@rancho-cocory/shared"
import { getGoogleReviews } from "@/lib/cms-client"

const emptyReviews: GoogleReviewsResponse = {
  rating: 0,
  userRatingCount: 0,
  displayName: "",
  reviews: [],
}

export function useGoogleReviews() {
  const [data, setData] = useState<GoogleReviewsResponse>(emptyReviews)
  const [isLoading, setIsLoading] = useState(true)
  const [source, setSource] = useState<string>("empty")

  useEffect(() => {
    let cancelled = false

    async function load() {
      setIsLoading(true)
      try {
        const response = await getGoogleReviews()
        if (!cancelled) {
          setData({
            rating: response.rating,
            userRatingCount: response.userRatingCount,
            displayName: response.displayName,
            reviews: response.reviews,
          })
          setSource(response.source)
        }
      } catch {
        if (!cancelled) {
          setData(emptyReviews)
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
  }, [])

  return { data, isLoading, source }
}
