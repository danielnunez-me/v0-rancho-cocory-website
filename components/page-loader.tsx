"use client"

import { useState, useEffect, useCallback, useRef } from "react"

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [isRevealing, setIsRevealing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [shouldRender, setShouldRender] = useState(false)
  const [showSlowMessage, setShowSlowMessage] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [showSlowVideoText, setShowSlowVideoText] = useState(false)
  const [minDurationMet, setMinDurationMet] = useState(false)
  const [pageLoaded, setPageLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hasCheckedSession = useRef(false)

  // Check sessionStorage - only run loader once per session
  useEffect(() => {
    if (hasCheckedSession.current) return
    hasCheckedSession.current = true

    const hasLoaded = sessionStorage.getItem("ranchoCocoryLoaderShown")
    if (hasLoaded) {
      setIsVisible(false)
      setShouldRender(false)
    } else {
      setShouldRender(true)
    }
  }, [])

  // Show text only if video takes >3 seconds to load
  useEffect(() => {
    if (!shouldRender || videoLoaded) return

    const slowVideoTimeout = setTimeout(() => {
      if (!videoLoaded) {
        setShowSlowVideoText(true)
      }
    }, 3000)

    return () => clearTimeout(slowVideoTimeout)
  }, [shouldRender, videoLoaded])

  // Handle video loaded
  const handleVideoLoaded = useCallback(() => {
    setVideoLoaded(true)
  }, [])

  // Progress bar synced to 20-second duration
  useEffect(() => {
    if (!isLoading || !shouldRender) return

    const startTime = Date.now()
    const duration = 20000 // 20 seconds

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)
    }, 100)

    return () => clearInterval(progressInterval)
  }, [isLoading, shouldRender])

  // Complete loading and trigger exit transition
  const completeLoading = useCallback(() => {
    setProgress(100)
    sessionStorage.setItem("ranchoCocoryLoaderShown", "true")
    
    setTimeout(() => {
      setIsRevealing(true)
      setIsLoading(false)
      
      // Remove from DOM after brush dissolve completes
      setTimeout(() => {
        setIsVisible(false)
      }, 1200)
    }, 300)
  }, [])

  // Handle video error - immediately show content
  const handleVideoError = useCallback(() => {
    sessionStorage.setItem("ranchoCocoryLoaderShown", "true")
    setIsVisible(false)
    setShouldRender(false)
  }, [])

  // 20-second minimum duration timer
  useEffect(() => {
    if (!shouldRender) return

    const minDurationTimer = setTimeout(() => {
      setMinDurationMet(true)
    }, 20000)

    return () => clearTimeout(minDurationTimer)
  }, [shouldRender])

  // Track page load state
  useEffect(() => {
    if (!shouldRender) return

    if (document.readyState === "complete") {
      setPageLoaded(true)
    } else {
      const handleLoad = () => setPageLoaded(true)
      window.addEventListener("load", handleLoad)
      return () => window.removeEventListener("load", handleLoad)
    }
  }, [shouldRender])

  // Complete loading only when BOTH conditions are met: page loaded AND 20s elapsed
  useEffect(() => {
    if (!shouldRender) return

    if (minDurationMet && pageLoaded) {
      completeLoading()
    }
  }, [minDurationMet, pageLoaded, shouldRender, completeLoading])

  // 60 second fallback for extremely slow loads
  useEffect(() => {
    if (!shouldRender) return

    const slowLoadTimeout = setTimeout(() => {
      setShowSlowMessage(true)
      // Force complete after showing message
      setTimeout(completeLoading, 3000)
    }, 60000)

    return () => clearTimeout(slowLoadTimeout)
  }, [shouldRender, completeLoading])

  if (!isVisible || !shouldRender) return null

  return (
    <>
      {/* Loader overlay with brush reveal */}
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center ${
          isRevealing ? "loader-brush-reveal" : ""
        }`}
      >
        {/* Fullscreen video background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="fixed inset-0 w-screen h-screen object-cover"
          onCanPlay={handleVideoLoaded}
          onLoadedData={handleVideoLoaded}
          onError={handleVideoError}
        >
          <source src="/loader-video.webm" type="video/webm" />
          <source src="/loader-video.mp4" type="video/mp4" />
        </video>

        {/* Thin progress bar at the very top */}
        <div className="fixed top-0 left-0 w-full h-[3px] bg-black/30 z-20">
          <div
            className="h-full transition-all duration-100 ease-linear"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, rgba(41, 170, 227, 0.6), rgba(41, 170, 227, 1))",
              boxShadow: "0 0 10px rgba(41, 170, 227, 0.5)",
            }}
          />
        </div>

        {/* Loading text - only shown if video takes >3s to load */}
        {showSlowVideoText && (
          <div
            className={`absolute bottom-12 left-1/2 -translate-x-1/2 z-10 text-center transition-all duration-500 ${
              isRevealing ? "opacity-0" : "opacity-100"
            }`}
          >
            {!showSlowMessage ? (
              <p className="text-white/90 text-sm tracking-[0.25em] uppercase font-light drop-shadow-lg">
                INITIALIZING RANCHO COCORY EXPERIENCE...
              </p>
            ) : (
              <div>
                <p className="text-white/90 text-sm tracking-[0.2em] uppercase font-light mb-2 drop-shadow-lg">
                  Preparing the RANCHO COCORY environment...
                </p>
                <p className="text-white/60 text-xs tracking-wide drop-shadow-lg">
                  This experience may take a little longer on your device.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Brush dissolve animation styles */}
      <style jsx>{`
        .loader-brush-reveal {
          animation: brushDissolve 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes brushDissolve {
          0% {
            clip-path: inset(0 0 0 0);
            opacity: 1;
          }
          15% {
            clip-path: polygon(
              0% 0%, 100% 0%, 100% 100%, 0% 100%,
              0% 90%, 8% 75%, 3% 60%, 10% 45%, 5% 30%, 12% 15%, 6% 0%
            );
          }
          30% {
            clip-path: polygon(
              15% 0%, 100% 0%, 100% 100%, 20% 100%,
              15% 85%, 25% 65%, 18% 45%, 28% 25%, 20% 5%
            );
          }
          50% {
            clip-path: polygon(
              40% 0%, 100% 0%, 100% 100%, 35% 100%,
              30% 80%, 45% 55%, 35% 30%, 48% 5%
            );
          }
          70% {
            clip-path: polygon(
              65% 0%, 100% 0%, 100% 100%, 60% 100%,
              55% 75%, 70% 45%, 58% 15%
            );
          }
          85% {
            clip-path: polygon(
              85% 0%, 100% 0%, 100% 100%, 80% 100%,
              75% 60%, 88% 25%
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
