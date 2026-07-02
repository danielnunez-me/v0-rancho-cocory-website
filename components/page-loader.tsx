'use client'

import { useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'ranchoCocoryLoaderShown'
const FULL_DURATION = 2200 // ms - primera visita en la sesión
const FAST_DURATION = 350 // ms - >80% de reducción cuando ya se mostró
const FADE_DURATION = 400 // ms - transición de salida

export function PageLoader() {
  const [progress, setProgress] = useState(0)
  const [fading, setFading] = useState(false)
  const [done, setDone] = useState(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    // Si el loader ya se mostró en esta sesión, acorta el ciclo >80%
    // en lugar de desmontarlo de inmediato: termina rápido y con fade suave.
    let alreadyShown = false
    try {
      alreadyShown = sessionStorage.getItem(STORAGE_KEY) === 'true'
    } catch {
      // sessionStorage no disponible (SSR/privacidad): usa ciclo completo
    }

    const duration = alreadyShown ? FAST_DURATION : FULL_DURATION
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const pct = Math.min((elapsed / duration) * 100, 100)
      setProgress(pct)

      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        try {
          sessionStorage.setItem(STORAGE_KEY, 'true')
        } catch {
          // ignorar
        }
        setFading(true)
        window.setTimeout(() => setDone(true), FADE_DURATION)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  if (done) return null

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Cargando página"
      className={`fixed inset-x-0 top-0 z-[100] transition-opacity duration-300 ease-out ${
        fading ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      {/* Barra de progreso superior */}
      <div className="h-2 w-full bg-muted sm:h-3">
        <div
          className="h-full bg-primary transition-[width] duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Indicador centrado y sutil */}
      <div className="flex justify-center pt-3">
        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 shadow-sm">
          <span
            aria-hidden="true"
            className="size-2 animate-pulse rounded-full bg-primary"
          />
          <span className="text-sm font-medium text-muted-foreground">
            {'Cargando...'}
          </span>
          <span className="text-sm font-semibold tabular-nums text-foreground">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
      <span className="sr-only">Cargando contenido de Rancho Cocory</span>
    </div>
  )
}
