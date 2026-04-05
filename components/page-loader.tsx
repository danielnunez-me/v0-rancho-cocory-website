"use client"

import { useState, useEffect, useCallback } from "react"

const loadingTexts = [
  "Initializing experience...",
  "Loading intelligent systems...",
  "Preparing interface...",
  "Almost ready...",
]

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [isRevealing, setIsRevealing] = useState(false)
  const [textIndex, setTextIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [videoFailed, setVideoFailed] = useState(false)

  // Cycle through loading texts
  useEffect(() => {
    if (!isLoading) return

    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length)
    }, 2000)

    return () => clearInterval(textInterval)
  }, [isLoading])

  // Simulate progress bar
  useEffect(() => {
    if (!isLoading) return

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev
        const increment = Math.random() * 8 + 2
        return Math.min(prev + increment, 90)
      })
    }, 300)

    return () => clearInterval(progressInterval)
  }, [isLoading])

  // Handle page load completion
  const completeLoading = useCallback(() => {
    setProgress(100)
    setTimeout(() => {
      setIsRevealing(true)
      setTimeout(() => {
        setIsVisible(false)
      }, 1200)
    }, 300)
  }, [])

  useEffect(() => {
    // Check if page is already loaded
    if (document.readyState === "complete") {
      // Still show loader for minimum time for UX
      const minLoadTime = setTimeout(completeLoading, 2500)
      return () => clearTimeout(minLoadTime)
    }

    // Wait for page to fully load
    const handleLoad = () => {
      // Minimum display time for smooth UX
      setTimeout(completeLoading, 1500)
    }

    window.addEventListener("load", handleLoad)

    // Fallback timeout
    const fallbackTimeout = setTimeout(completeLoading, 5000)

    return () => {
      window.removeEventListener("load", handleLoad)
      clearTimeout(fallbackTimeout)
    }
  }, [completeLoading])

  // Mark loading as complete when revealing starts
  useEffect(() => {
    if (isRevealing) {
      setIsLoading(false)
    }
  }, [isRevealing])

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
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-1000 ${
          isRevealing ? "loader-reveal" : ""
        }`}
        style={{
          backgroundColor: "#0b0b0b",
        }}
      >
        {/* Loader container */}
        <div
          className={`relative mb-8 transition-all duration-500 ${
            isRevealing ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          {/* Glow effect */}
          <div
            className="absolute inset-0 rounded-2xl blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(41, 170, 227, 0.5), rgba(41, 170, 227, 0.1), transparent)",
              transform: "scale(1.5)",
            }}
          />

          {/* Video element or fallback */}
          {!videoFailed ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="relative z-10 h-[240px] w-auto object-contain rounded-xl"
              style={{
                filter: "drop-shadow(0 0 40px rgba(41, 170, 227, 0.3))",
              }}
              onError={() => setVideoFailed(true)}
            >
              <source src="/loader-video.webm" type="video/webm" />
              <source src="/loader-video.mp4" type="video/mp4" />
            </video>
          ) : null}

          {/* Fallback animated loader - always visible until video loads */}
          <div 
            className={`relative z-10 h-[240px] w-[240px] flex items-center justify-center ${!videoFailed ? 'absolute inset-0' : ''}`}
            style={{
              filter: "drop-shadow(0 0 40px rgba(41, 170, 227, 0.3))",
            }}
          >
            {/* Orbital rings loader */}
            <div className="orbital-loader">
              <div className="orbital-ring orbital-ring-1" />
              <div className="orbital-ring orbital-ring-2" />
              <div className="orbital-ring orbital-ring-3" />
              <div className="orbital-core" />
            </div>
          </div>
        </div>

        {/* Loading text with fade animation */}
        <div
          className={`h-8 mb-6 transition-all duration-500 ${
            isRevealing ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          <p
            key={textIndex}
            className="text-white/80 text-sm tracking-wider uppercase font-light animate-fade-in-text"
          >
            {loadingTexts[textIndex]}
          </p>
        </div>

        {/* Progress bar */}
        <div
          className={`w-48 h-[2px] bg-white/10 rounded-full overflow-hidden transition-all duration-500 ${
            isRevealing ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, rgba(41, 170, 227, 0.5), rgba(41, 170, 227, 1))",
              boxShadow: "0 0 20px rgba(41, 170, 227, 0.5)",
            }}
          />
        </div>

        {/* Brush reveal mask overlay */}
        <div
          className={`absolute inset-0 pointer-events-none ${isRevealing ? "brush-reveal-active" : ""}`}
          style={{
            background: "#0b0b0b",
            clipPath: isRevealing
              ? "circle(150% at 50% 50%)"
              : "circle(0% at 50% 50%)",
            transition: "clip-path 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes fadeInText {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-text {
          animation: fadeInText 0.5s ease-out forwards;
        }

        .loader-reveal {
          clip-path: circle(0% at 50% 50%);
          transition: clip-path 1.2s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .orbital-loader {
          position: relative;
          width: 120px;
          height: 120px;
        }

        .orbital-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid transparent;
        }

        .orbital-ring-1 {
          border-top-color: rgba(41, 170, 227, 1);
          border-right-color: rgba(41, 170, 227, 0.3);
          animation: orbit 2s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
        }

        .orbital-ring-2 {
          inset: 15px;
          border-bottom-color: rgba(41, 170, 227, 0.8);
          border-left-color: rgba(41, 170, 227, 0.2);
          animation: orbit 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite reverse;
        }

        .orbital-ring-3 {
          inset: 30px;
          border-top-color: rgba(41, 170, 227, 0.6);
          border-right-color: rgba(41, 170, 227, 0.1);
          animation: orbit 2.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
        }

        .orbital-core {
          position: absolute;
          inset: 45px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(41, 170, 227, 0.8), rgba(41, 170, 227, 0.2));
          animation: pulse 1.5s ease-in-out infinite;
          box-shadow: 0 0 30px rgba(41, 170, 227, 0.5);
        }

        @keyframes orbit {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
        }

        .brush-reveal-active {
          animation: brushReveal 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes brushReveal {
          0% {
            clip-path: inset(0 0 0 0);
            opacity: 1;
          }
          50% {
            clip-path: inset(0 0 0 50%);
          }
          100% {
            clip-path: inset(0 0 0 100%);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}
