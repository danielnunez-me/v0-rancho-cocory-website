"use client"

import { useEffect, useRef } from "react"
import { Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptLoaded = useRef(false)

  useEffect(() => {
    if (scriptLoaded.current) return
    scriptLoaded.current = true

    // Load Elfsight platform script for Instagram feed widget
    const script = document.createElement("script")
    script.src = "https://static.elfsight.com/platform/platform.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup is optional since script is reusable
    }
  }, [])

  return (
    <section id="galeria" className="py-20 md:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
            Nuestro parque
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif text-balance">
            Siguenos en Instagram
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {'Mira las ultimas fotos y videos de la experiencia Rancho Cocory directamente desde nuestro Instagram.'}
          </p>
        </div>

        {/* Instagram feed widget container */}
        <div ref={containerRef} className="min-h-[300px]">
          {/*
            Replace the class below with your actual Elfsight widget class.
            To set it up:
            1. Go to elfsight.com and create a free account
            2. Create an "Instagram Feed" widget
            3. Connect your Instagram account (@ranchococory)
            4. Customize the layout (grid recommended, 6-12 posts)
            5. Copy the widget class (e.g., "elfsight-app-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx")
            6. Replace the class in the div below
          */}
          <div className="elfsight-app-REPLACE-WITH-YOUR-WIDGET-ID" data-elfsight-app-lazy />

          {/* Fallback while widget loads or if not configured */}
          <noscript>
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {'Habilita JavaScript para ver nuestro feed de Instagram.'}
              </p>
            </div>
          </noscript>
        </div>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full font-bold border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            asChild
          >
            <a
              href="https://instagram.com/ranchococory"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="size-5" />
              Seguir en Instagram
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
