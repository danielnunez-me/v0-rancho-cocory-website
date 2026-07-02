"use client"

import { useState, useEffect, useCallback, useRef } from "react"

export function PageLoader() {
  // Lectura síncrona de sessionStorage: sin efectos ni timeouts artificiales
  const [isReturningVisit] = useState<boolean>(() => {
    if (typeof window === "undefined") return false
    return sessionStorage.getItem("ranchoCocoryLoaderShown") === "true"
  })
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)
  const [progress, setProgress] = useState(0)
  const hasCompleted = useRef(false)

  // Duración de salida: visita recurrente = 80% más rápida (duration-150 vs duration-1000)
  const exitDurationClass = isReturningVisit ? "duration-150" : "duration-1000"
  const exitMs = isReturningVisit ? 150 : 1000

  // Completa la carga y dispara la transición de salida (sin bloquear la app)
  const completeLoading = useCallback(() => {
    if (hasCompleted.current) return
    hasCompleted.current = true

    setProgress(100)
    sessionStorage.setItem("ranchoCocoryLoaderShown", "true")

    // rAF: encadena la salida al siguiente frame de pintado, sin retrasos artificiales
    requestAnimationFrame(() => {
      setIsExiting(true)
      setTimeout(() => setIsVisible(false), exitMs)
    })
  }, [exitMs])

  // Progreso visual ligado a la carga real de la página (sin duración mínima artificial)
  useEffect(() => {
    if (!isVisible || hasCompleted.current) return

    let rafId: number
    const startTime = performance.now()

    const tick = (now: number) => {
      if (hasCompleted.current) return
      const elapsed = now - startTime
      // Curva asintótica: avanza rápido al inicio y se aproxima a 90% mientras carga
      const simulated = 90 * (1 - Math.exp(-elapsed / 1200))
      setProgress((prev) => Math.max(prev, Math.min(simulated, 90)))
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafId)
  }, [isVisible])

  // Completa en cuanto la página está realmente cargada — cero bloqueos
  useEffect(() => {
    if (document.readyState === "complete") {
      completeLoading()
      return
    }
    const handleLoad = () => completeLoading()
    window.addEventListener("load", handleLoad)
    return () => window.removeEventListener("load", handleLoad)
  }, [completeLoading])

  if (!isVisible) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0b0b0b] transition-opacity ease-out ${exitDurationClass} ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Contenedor responsivo: el video ya no ocupa toda la pantalla */}
      <div className="flex w-full max-w-sm sm:max-w-md md:max-w-lg flex-col items-center gap-6 px-6">
        {/* Video del loader: intacto y 100% responsive */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-auto rounded-xl object-contain"
          style={{
            filter: "drop-shadow(0 0 40px rgba(41, 170, 227, 0.3))",
          }}
          onError={completeLoading}
        >
          <source src="/loader-video.webm" type="video/webm" />
        </video>

        {/* Barra de carga más gruesa (h-2 en móvil, h-3 en escritorio) */}
        <div className="w-full h-2 sm:h-3 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-[width] duration-150 ease-out"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, rgba(41, 170, 227, 0.7), rgba(41, 170, 227, 1))",
              boxShadow: "0 0 12px rgba(41, 170, 227, 0.5)",
            }}
          />
        </div>
      </div>

      <span className="sr-only">Cargando Rancho Cocory</span>
    </div>
  )
}
