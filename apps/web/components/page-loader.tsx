"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useContent } from "@/components/content-provider"

function getMp4FallbackUrl(videoUrl: string): string | null {
  if (videoUrl.endsWith(".webm")) {
    return videoUrl.replace(/\.webm$/, ".mp4")
  }
  return null
}

export function PageLoader() {
  const { content } = useContent()
  const { loader } = content
  const videoRef = useRef<HTMLVideoElement>(null)

  const [isReturningVisit] = useState<boolean>(() => {
    if (typeof window === "undefined") return false
    return sessionStorage.getItem("ranchoCocoryLoaderShown") === "true"
  })
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)
  const [progress, setProgress] = useState(0)
  const hasCompleted = useRef(false)

  const exitDurationClass = isReturningVisit ? "duration-150" : "duration-1000"
  const exitMs = isReturningVisit ? 150 : 1000
  const mp4FallbackUrl = getMp4FallbackUrl(loader.videoUrl)

  const completeLoading = useCallback(() => {
    if (hasCompleted.current) return
    hasCompleted.current = true

    setProgress(100)
    sessionStorage.setItem("ranchoCocoryLoaderShown", "true")

    requestAnimationFrame(() => {
      setIsExiting(true)
      setTimeout(() => setIsVisible(false), exitMs)
    })
  }, [exitMs])

  useEffect(() => {
    if (!isVisible || hasCompleted.current) return

    let rafId: number
    const startTime = performance.now()

    const tick = (now: number) => {
      if (hasCompleted.current) return
      const elapsed = now - startTime
      const simulated = 90 * (1 - Math.exp(-elapsed / 1800))
      setProgress((prev) => Math.max(prev, Math.min(simulated, 90)))
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafId)
  }, [isVisible])

  useEffect(() => {
    if (document.readyState === "complete") {
      completeLoading()
      return
    }
    const handleLoad = () => completeLoading()
    window.addEventListener("load", handleLoad)
    return () => window.removeEventListener("load", handleLoad)
  }, [completeLoading])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay may be blocked; loader still completes on window load.
      })
    }
  }, [loader.videoUrl])

  if (!isVisible) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity ease-out ${exitDurationClass} ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex w-full max-w-sm sm:max-w-md md:max-w-lg flex-col items-center gap-5 px-6">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          className="block w-full h-auto object-contain bg-white border-0 outline-none shadow-none"
          onError={completeLoading}
        >
          <source src={loader.videoUrl} type="video/webm" />
          {mp4FallbackUrl ? (
            <source src={mp4FallbackUrl} type="video/mp4" />
          ) : null}
        </video>

        <div className="w-40 sm:w-48 h-[2px] bg-sky-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-[width] duration-150 ease-out"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${loader.progressGradientStart}, ${loader.progressGradientEnd})`,
            }}
          />
        </div>

        <p className="text-sm text-gray-400 font-light">{loader.loadingText}</p>
      </div>

      <span className="sr-only">Cargando Rancho Cocory</span>
    </div>
  )
}
