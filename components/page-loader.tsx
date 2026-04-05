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

  // Simulate progress bar
  useEffect(() => {
    if (!isLoading || !shouldRender) return

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev
        const increment = Math.random() * 5 + 1
        return Math.min(prev + increment, 90)
      })
    }, 400)

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

  // Main loading logic
  useEffect(() => {
    if (!shouldRender) return

    let loadTimeout: NodeJS.Timeout
    let slowLoadTimeout: NodeJS.Timeout

    const triggerComplete = () => {
      clearTimeout(loadTimeout)
      clearTimeout(slowLoadTimeout)
      completeLoading()
    }

    // If page already loaded, wait minimum time for cinematic effect
    if (document.readyState === "complete") {
      loadTimeout = setTimeout(triggerComplete, 3000)
    } else {
      // Wait for page to fully load
      const handleLoad = () => {
        loadTimeout = setTimeout(triggerComplete, 2000)
      }
      window.addEventListener("load", handleLoad)
      
      // Cleanup listener
      return () => {
        window.removeEventListener("load", handleLoad)
        clearTimeout(loadTimeout)
        clearTimeout(slowLoadTimeout)
      }
    }

    // 60 second fallback for slow loads
    slowLoadTimeout = setTimeout(() => {
      setShowSlowMessage(true)
      // Auto-continue after showing message
      setTimeout(triggerComplete, 3000)
    }, 60000)

    return () => {
      clearTimeout(loadTimeout)
      clearTimeout(slowLoadTimeout)
    }
  }, [completeLoading, shouldRender])

  if (!isVisible || !shouldRender) return null

  return (
    <>
      {/* Main content blur-to-sharp transition overlay */}
      <div
        className={`fixed inset-0 z-[9998] pointer-events-none transition-all duration-700 ${
          isRevealing ? "backdrop-blur-0 opacity-0" : "backdrop-blur-md opacity-100"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

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

        {/* Dark gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Centered glass UI container */}
        <div
          className={`relative z-10 flex flex-col items-center bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 transition-all duration-500 ${
            isRevealing ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          {/* Loading text - only shown if video takes >3s to load or for slow page loads */}
          {showSlowVideoText && (
            !showSlowMessage ? (
              <p className="text-white/90 text-sm tracking-[0.25em] uppercase font-light mb-6 text-center">
                INITIALIZING RANCHO COCORY EXPERIENCE...
              </p>
            ) : (
              <div className="text-center mb-6">
                <p className="text-white/90 text-sm tracking-[0.2em] uppercase font-light mb-2">
                  Preparing the RANCHO COCORY environment...
                </p>
                <p className="text-white/60 text-xs tracking-wide">
                  This experience may take a little longer on your device.
                </p>
              </div>
            )
          )}

          {/* Progress bar */}
          <div className={`w-56 h-[2px] bg-white/10 rounded-full overflow-hidden ${showSlowVideoText ? '' : 'mt-0'}`}>
            <div
              className="h-full rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, rgba(41, 170, 227, 0.5), rgba(41, 170, 227, 1))",
                boxShadow: "0 0 15px rgba(41, 170, 227, 0.5)",
              }}
            />
          </div>
        </div>
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
