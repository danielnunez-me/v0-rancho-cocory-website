"use client"

import { useState, useEffect, useCallback, useRef } from "react"

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [isRevealing, setIsRevealing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [shouldRender, setShouldRender] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hasCheckedSession = useRef(false)

  // Check if this is the first page load (only run loader once per session)
  useEffect(() => {
    if (hasCheckedSession.current) return
    hasCheckedSession.current = true

    const hasLoaded = sessionStorage.getItem("pageLoaderShown")
    if (hasLoaded) {
      // Already shown this session, skip loader entirely
      setIsVisible(false)
      setShouldRender(false)
    } else {
      setShouldRender(true)
    }
  }, [])

  // Simulate progress bar
  useEffect(() => {
    if (!isLoading || !shouldRender) return

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev
        const increment = Math.random() * 8 + 2
        return Math.min(prev + increment, 90)
      })
    }, 300)

    return () => clearInterval(progressInterval)
  }, [isLoading, shouldRender])

  // Handle page load completion
  const completeLoading = useCallback(() => {
    setProgress(100)
    sessionStorage.setItem("pageLoaderShown", "true")
    setTimeout(() => {
      setIsRevealing(true)
      setTimeout(() => {
        setIsVisible(false)
      }, 1000)
    }, 300)
  }, [])

  // Handle video error - immediately show content
  const handleVideoError = useCallback(() => {
    sessionStorage.setItem("pageLoaderShown", "true")
    setIsVisible(false)
  }, [])

  useEffect(() => {
    if (!shouldRender) return

    // Check if page is already loaded
    if (document.readyState === "complete") {
      const minLoadTime = setTimeout(completeLoading, 2500)
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
  }, [completeLoading, shouldRender])

  // Mark loading as complete when revealing starts
  useEffect(() => {
    if (isRevealing) {
      setIsLoading(false)
    }
  }, [isRevealing])

  if (!isVisible || !shouldRender) return null

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
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-1000 ${
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
          onError={handleVideoError}
        >
          <source src="/loader-video.webm" type="video/webm" />
          <source src="/loader-video.mp4" type="video/mp4" />
        </video>

        {/* Dark gradient overlay for readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Centered glass UI container */}
        <div
          className={`relative z-10 flex flex-col items-center px-12 py-10 rounded-2xl transition-all duration-500 ${
            isRevealing ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
          style={{
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Loading text */}
          <p
            className="text-white/90 text-sm tracking-[0.3em] uppercase font-light mb-6"
            style={{
              textShadow: "0 0 20px rgba(41, 170, 227, 0.3)",
            }}
          >
            INITIALIZING EXPERIENCE...
          </p>

          {/* Progress bar */}
          <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, rgba(41, 170, 227, 0.5), rgba(41, 170, 227, 1))",
                boxShadow: "0 0 20px rgba(41, 170, 227, 0.5)",
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
              0% 85%, 3% 70%, 0% 55%, 2% 40%, 0% 25%, 4% 10%
            );
          }
          40% {
            clip-path: polygon(
              20% 0%, 100% 0%, 100% 100%, 15% 100%,
              10% 80%, 18% 60%, 12% 40%, 22% 20%, 15% 0%
            );
          }
          60% {
            clip-path: polygon(
              45% 0%, 100% 0%, 100% 100%, 40% 100%,
              35% 75%, 48% 50%, 38% 25%, 50% 0%
            );
          }
          80% {
            clip-path: polygon(
              75% 0%, 100% 0%, 100% 100%, 70% 100%,
              65% 70%, 78% 40%, 68% 10%
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
