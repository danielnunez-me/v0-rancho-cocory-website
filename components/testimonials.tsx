"use client"

import { useEffect, useRef } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Testimonials() {
  const scriptLoaded = useRef(false)

  useEffect(() => {
    if (scriptLoaded.current) return
    scriptLoaded.current = true

    // Load Elfsight platform script for Google Reviews widget
    // The script may already be loaded by the Gallery component,
    // but adding it again is safe (browser deduplicates)
    const existing = document.querySelector(
      'script[src="https://static.elfsight.com/platform/platform.js"]'
    )
    if (!existing) {
      const script = document.createElement("script")
      script.src = "https://static.elfsight.com/platform/platform.js"
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <section className="py-20 md:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
            Nuestros visitantes
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif text-balance">
            Lo que dicen de nosotros
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`size-5 ${s <= 4 ? "fill-accent text-accent" : "fill-accent/50 text-accent/50"}`}
                />
              ))}
            </div>
            <span className="text-muted-foreground text-sm font-semibold">
              4.5 en Google Reviews
            </span>
          </div>
        </div>

        {/* Google Reviews widget container */}
        <div className="min-h-[200px]">
          {/*
            Replace the class below with your actual Elfsight Google Reviews widget class.
            To set it up:
            1. Go to elfsight.com and create a free account (or use your existing one)
            2. Create a "Google Reviews" widget
            3. Search for "Rancho Cocory" to connect your business
            4. Customize the layout (slider or grid, show 3-6 reviews)
            5. Copy the widget class (e.g., "elfsight-app-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx")
            6. Replace the class in the div below
          */}
          <div className="elfsight-app-REPLACE-WITH-YOUR-REVIEWS-WIDGET-ID" data-elfsight-app-lazy />
        </div>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full font-bold border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            asChild
          >
            <a
              href="https://search.google.com/local/reviews?placeid=ChIJ6eHmZkhIqowRNY9WuTsX2289"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Star className="size-5" />
              Ver todas las resenas en Google
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
