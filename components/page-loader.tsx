"use client"

import { useState, useEffect, useCallback, useRef } from "react"

const SESSION_KEY = "pageloader_shown"

export function PageLoader() {
  const [isVisible, setIsVisible] = useState(false)
  const [isRevealing, setIsRevealing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hasInitialized = useRef(false)

  // Check if this is the first page load
  useEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true

    // Only show loader on first visit per session
    if (typeof window !== "undefined") {
      const hasShown = sessionStorage.getItem(SESSION_KEY)
      if (!hasShown) {
        setIsVisible(true)
        sessionStorage.setItem(SESSION_KEY, "true")
      }
    }
  }, [])

  // Simulate progress bar
  useEffect(() => {
    if (!isVisible || isRevealing) return

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev
        const increment = Math.random() * 8 + 2
        return Math.min(prev + increment, 90)
      })
    }, 300)

    return () => clearInterval(progressInterval)
  }, [isVisible, isRevealing])

  // Handle page load completion
  const completeLoading = useCallback(() => {
    setProgress(100)
    setTimeout(() => {
      setIsRevealing(true)
      setTimeout(() => {
        setIsVisible(false)
      }, 1000)
    }, 300)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    // Check if page is already loaded
    if (document.readyState === "complete") {
      const minLoadTime = setTimeout(completeLoading, 2000)
      return () => clearTimeout(minLoadTime)
    }

    // Wait for page to fully load
    const handleLoad = () => {
      setTimeout(completeLoading, 1500)
    }

    window.addEventListener("load", handleLoad)

    // Fallback timeout
    const fallbackTimeout = setTimeout(completeLoading, 5000)

    return () => {
      window.removeEventListener("load", handleLoad)
      clearTimeout(fallbackTimeout)
    }
  }, [isVisible, completeLoading])

  // Handle video load error - immediately hide loader
  const handleVideoError = useCallback(() => {
    setIsVisible(false)
  }, [])

  // Handle video loaded
  const handleVideoLoaded = useCallback(() => {
    setVideoLoaded(true)
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Main content blur overlay */}
      <div
        className={`fixed inset-0 z-[9998] pointer-events-none transition-all duration-700 ${
          isRevealing ? "backdrop-blur-0 opacity-0" : "backdrop-blur-sm opacity-100"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {/* Loader overlay with brush reveal */}
      <div
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center ${
          isRevealing ? "loader-reveal" : ""
        }`}
      >
        {/* Fullscreen video background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          onLoadedData={handleVideoLoaded}
          onError={handleVideoError}
        >
          <source src="/loader-video.webm" type="video/webm" />
          <source src="/loader-video.mp4" type="video/mp4" />
        </video>

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.7) 100%)",
          }}
        />

        {/* Glass UI container */}
        <div
          className={`relative z-10 flex flex-col items-center px-12 py-10 rounded-2xl transition-all duration-500 ${
            isRevealing ? "opacity-0 scale-95 translate-y-4" : "opacity-100 scale-100 translate-y-0"
          }`}
          style={{
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Loading text */}
          <p className="text-white/90 text-sm tracking-[0.3em] uppercase font-light mb-6">
            INITIALIZING EXPERIENCE...
          </p>

          {/* Progress bar */}
          <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.9))",
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .loader-reveal {
          animation: brushDissolve 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes brushDissolve {
          0% {
            clip-path: polygon(
              0% 0%, 100% 0%, 100% 100%, 0% 100%
            );
            opacity: 1;
          }
          20% {
            clip-path: polygon(
              5% 0%, 100% 0%, 100% 100%, 0% 100%,
              0% 85%, 8% 70%, 3% 50%, 10% 30%, 5% 15%
            );
          }
          40% {
            clip-path: polygon(
              20% 0%, 100% 0%, 100% 100%, 15% 100%,
              10% 80%, 25% 60%, 15% 40%, 30% 20%, 20% 5%
            );
          }
          60% {
            clip-path: polygon(
              45% 0%, 100% 0%, 100% 100%, 40% 100%,
              35% 75%, 50% 55%, 40% 35%, 55% 15%, 45% 0%
            );
          }
          80% {
            clip-path: polygon(
              70% 0%, 100% 0%, 100% 100%, 65% 100%,
              60% 70%, 75% 50%, 65% 30%, 80% 10%, 70% 0%
            );
          }
          100% {
            clip-path: polygon(
              100% 0%, 100% 0%, 100% 100%, 100% 100%
            );
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}
