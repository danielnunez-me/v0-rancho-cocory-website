"use client"

import { useState, useEffect, useCallback, useRef } from "react"

const FULL_DURATION = 20000 // First visit: 20s cycle
const FAST_DURATION = 2500 // Returning visit: >80% shorter cycle
const EXIT_TRANSITION = 500 // Fade-out duration (ms)

export function PageLoader() {
  // Lazy initializers: read sessionStorage once, synchronously, for the fastest possible first render
  const [isReturningVisit] = useState<boolean>(() => {
    if (typeof window === "undefined") return false
    return sessionStorage.getItem("ranchoCocoryLoaderShown") === "true"
  })
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [pageLoaded, setPageLoaded] = useState(false)
  const [durationMet, setDurationMet] = useState(false)
  const hasCompleted = useRef(false)

  const duration = isReturningVisit ? FAST_DURATION : FULL_DURATION

  // Complete loading and trigger smooth exit transition
  const completeLoading = useCallback(() => {
    if (hasCompleted.current) return
    hasCompleted.current = true

    setProgress(100)
    sessionStorage.setItem("ranchoCocoryLoaderShown", "true")

    setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => setIsVisible(false), EXIT_TRANSITION)
    }, 200)
  }, [])

  // Progress bar synced to the active duration
  useEffect(() => {
    if (!isVisible) return

    const startTime = Date.now()
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      setProgress(Math.min((elapsed / duration) * 100, 100))
    }, 50)

    return () => clearInterval(progressInterval)
  }, [isVisible, duration])

  // Minimum duration timer
  useEffect(() => {
    const timer = setTimeout(() => setDurationMet(true), duration)
    return () => clearTimeout(timer)
  }, [duration])

  // Track page load state
  useEffect(() => {
    if (document.readyState === "complete") {
      setPageLoaded(true)
      return
    }
    const handleLoad = () => setPageLoaded(true)
    window.addEventListener("load", handleLoad)
    return () => window.removeEventListener("load", handleLoad)
  }, [])

  // Complete when BOTH conditions are met: page loaded AND duration elapsed
  useEffect(() => {
    if (durationMet && pageLoaded) {
      completeLoading()
    }
  }, [durationMet, pageLoaded, completeLoading])

  // Safety fallback: never block the page for more than 45s
  useEffect(() => {
    const fallback = setTimeout(completeLoading, 45000)
    return () => clearTimeout(fallback)
  }, [completeLoading])

  if (!isVisible) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-x-0 top-0 z-[9999] transition-opacity duration-500 ease-out ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Thick top progress bar */}
      <div className="w-full h-2 sm:h-3 bg-black/10 overflow-hidden">
        <div
          className="h-full transition-[width] duration-100 ease-linear rounded-r-full"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, rgba(41, 170, 227, 0.7), rgba(41, 170, 227, 1))",
            boxShadow: "0 0 12px rgba(41, 170, 227, 0.5)",
          }}
        />
      </div>

      {/* Subtle centered loading indicator */}
      <div className="flex justify-center mt-4 px-4">
        <div className="flex items-center gap-3 rounded-full bg-black/70 backdrop-blur-sm border border-white/10 px-4 py-2 shadow-lg">
          {/* Spinner */}
          <span
            className="h-4 w-4 shrink-0 rounded-full border-2 border-white/20 animate-spin"
            style={{ borderTopColor: "rgba(41, 170, 227, 1)" }}
            aria-hidden="true"
          />
          <span className="text-white/90 text-xs sm:text-sm font-light tracking-wide whitespace-nowrap">
            {"Cargando..."}
          </span>
          <span className="text-white/50 text-xs tabular-nums" aria-hidden="true">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  )
}
